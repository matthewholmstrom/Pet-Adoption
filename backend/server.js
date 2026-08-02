import db from "./db.js";
import express from "express";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { json } from "stream/consumers";

dotenv.config();



const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/images", express.static("images"));




const storage = multer.diskStorage({
    destination: (req,file,cb) =>{

        cb(null, "images/")
    },
    
    filename: (req, file, cb) =>{
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
})


const upload = multer({storage});





function authenticateToken(req, res, next){


    const authHeader = req.headers["authorization"];

    const token = authHeader &&
    authHeader.split(" ")[1];

    if(!token){

        return res.status(401).json({message: "No token"})
    };


    jwt.verify(token,
        process.env.JWT_Secret,

        (err,user) =>{

            if(err){

                return res.status(403).json({message: "Invalid token"})
            };

            req.user = user;

            console.log("passed authenication check")

            next();
        }
    )
}



function checkShelter(req, res, next){


    if(req.user.role !== "shelter"){

                    console.log("user is not a shelter.")


        return res.status(403).json({message: "Forbidden"})
    }

                console.log("passed shelter check")


    next();


};


function checkAdopter(req, res, next){


    if(req.user.role !== "adopter"){

        return res.status(403).json({message: "Forbidden"})
    };

    next();
}




app.get('/pets', async (req, res) =>{

    try{

        const {s_id} = req.query;

        let sql = `select pets.*, shelters.name as shelter_name from pets left join shelters on shelters.id = pets.shelter_id`

        let params = [];

        if(s_id){


            sql += " where pets.shelter_id = ?";
            params.push(s_id);
        }

        const [rows] = await db.query(sql, params)
        console.log(rows);
        res.status(200).json(rows)
    

    }catch(err){

        return res.status(400).json({error: err})
    }


})


app.put('/pets',
    authenticateToken,
    checkShelter, upload.single("image_file"), async (req,res) =>{

        const user_id = req.user.id;


    const image_url = req.file? `/images/${req.file.filename}`:null;

    const { id, name, type, breed, age, size, energy_level, temperament, attention_needs, maintenance_level, training_status,good_with_kids,
  good_with_pets, home_type,description
} = req.body;


const sql = `
UPDATE pets p
inner join shelters s on
s.id = p.shelter_id SET p.name = ?, p.type = ?, p.breed = ?, p.age = ?,
    p.energy_level = ?, p.temperament = ?, p.attention_needs = ?, p.size = ?,
    p.good_with_kids = ?,
    p.good_with_pets = ?,
    p.training_status = ?,
    p.maintenance_level = ?,
    p.home_type = ?,
    p.description = ?,
    p.image_url = COALESCE(?, p.image_url)
WHERE p.id = ? and s.user_id = ?
`;


const [result] = await db.query(sql, [
    name, type, breed, age,

    energy_level, temperament, attention_needs, size,
    good_with_kids, good_with_pets, training_status,

    maintenance_level, home_type, description, image_url, id, user_id
]);



    if(result.affectedRows === 0){

        console.log("The pet's info  could not be changed.");
        return res.status(404).json({error: "the update pet's info operation could not be done successfully."});
    };

    return res.status(200).json({message: "update pet's info successful"});



})




app.get('/pet_info/:id', async (req, res) =>{


try{
    const {id} = req.params;

    const [rows] = await db.query('select * from pets where id = ?', [id]);

    if(rows.length === 0){

        return res.status(400).json("Message: No matches were found in the database")

    }

    return res.status(200).json(

    rows[0])
}catch(err){

    return res.status(400).json({error: "There was an error on the backend."})
}

});





app.get('/pet_info_for_shelter/:id',
    authenticateToken,
    checkShelter, async (req, res) =>{


try{

    
    const {id} = req.params;

    const user_id = req.user.id;

    const sql = 'select p.*, s.name as shelter_name, s.image_url as shelter_image_url from pets p inner join shelters s on s.id = p.shelter_id where p.id=? and s.user_id = ?'

    const [rows] = await db.query(sql, [id, user_id]);

    if(rows.length === 0){

        return res.status(400).json("Message: No matches were found in the database")

    }

    return res.status(200).json(

    rows[0])
}catch(err){

    return res.status(400).json({error: "There was an error on the backend."})
}

});




app.get('/shelters/:id', async (req, res) =>{

try{
const {id} = req.params;

if(!id){

    return res.status(400).json({error: "shelter id was not provided"});
}


const [rows] = await db.query('select * from shelters where id = ?', [id]);


if(rows.length===0){

   return res.status(400).json({error: "No rows returned"});
}

 return res.status(200).json(rows[0]);

}catch(err){

   return res.status(400).json({error: err});
}


})






app.post('/shelter_add_pet',
    authenticateToken,
    checkShelter, upload.single("image_file"), async (req,res) =>{

              console.log("Reached route");


 const { name, type, breed, age, city, state,
    status, energy_level, temperament, attention_needs,
    size, good_with_kids, good_with_pets, training_status,
    maintenance_level, home_type, description } = req.body;


    const user_id = req.user.id;

    let image_url = null;


    if(req.file){

        image_url = `/images/${req.file.filename}`;
    };


    const [rows] = await db.query(`select s.id as shelt_id from shelters s inner join users on users.id = s.user_id where
       users.id = ? `, [user_id]);

       if(rows.length ===0){

        console.log("no rows were returned");

    return res.status(400).json({error: "No shelter found for user"});
}



       const shelt_id = rows[0].shelt_id;



        const [result] = await db.query(
        `insert into pets 
        (name, type, breed, age, city, state, status, energy_level, temperament, attention_needs, size, good_with_kids, good_with_pets, training_status, maintenance_level, home_type, description, image_url, shelter_id)
        values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            name, type, breed, age, city, state, status, energy_level,
            temperament, attention_needs, size, good_with_kids, good_with_pets,
            training_status, maintenance_level, home_type, description,
            image_url, shelt_id
        ]
);


if(result.affectedRows === 0){

        console.log("Create pet profile was unsuccessful");
        return res.status(400).json({error: "error occured in put shelter add pet route"});
   
}
    return res.status(200).json({message: "New pet was added"});


});



app.post('/signup', async (req, res) =>{


    try{
    const {fullname, email, password, role} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query('insert into users (name, email, password, role) values (?,?,?,?)', [fullname, email, hashedPassword, role]);

    const token = jwt.sign({

        id: result.insertId,
        name: fullname,
        role:role
    }, process.env.JWT_Secret,
    {expiresIn: "1h"}

)
    
        return res.status(201).json({message: "sucessfully added user",
            token: token
        })

    }catch(err){

        return res.status(400).json({error: err.message})
    }
    
});





app.post('/signup_shelter_plus_user', async (req,res) =>{



    const {fullname, email, password, role}  = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const [result] = await db.query('insert into users (name, email, password, role ) values (?,?,?,?)', [fullname,email,hashedPassword,role]);

    const [result2] = await db.query('insert into shelters (user_id) values (?)', [result.insertId]);

    if(result2.affectedRows ===0){

        console.log("no rows were inserted in shelter signup");
        return res.status(400).json({error: "no results were inserted"})
    }



    const token = jwt.sign({

        id: result.insertId,
        name: fullname,
        role: role


    }, process.env.JWT_Secret,
    {expiresIn: "1h"}
);


    
    return res.status(200).json({message: "successfully added user",

        token: token
    })
});


app.post('/login', async (req, res) =>{


    const {email, password} = req.body;

    try{

    const [rows] = await db.query('select * from users where email = ?', [email])


    
    if(rows.length === 0){

        return res.status(401).json({error: "no user with that email password combination"})
    }




    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password)


    if(!passwordMatch){

        console.log("Passwords don't match");
        return res.status(401).json({error: "The passwords do not match"})
    }


    const token = jwt.sign({
          id: rows[0].id,
            name: rows[0].name,
            role: rows[0].role
    },
process.env.JWT_Secret,
{expiresIn: "1h"});


        return res.status(200).json({
            message: "success",
            token:token
        });

    }catch(err){

        return res.status(400).json({error: err.message})
    }


});






app.get('/shelters', async (req, res) =>{

    try{

    const {location} = req.query;




    if(location === "All Shelters"){

        return res.status(200).json(null);

    }
    if (location && location !== "All Shelters"){

        const [rows] = await db.query('select id from shelters where name = ?', [location]);

        if(rows.length ===0){


            return res.status(400).json({message: "There we no matching rows."})
        }
        
        else{
        return res.status(200).json(rows[0].id);
        }
    }

    if(!location){

        const [rows] = await db.query('select * from shelters');
        return res.status(200).json(rows);
    }

}catch(err){

    res.status(400).json({error: err});
}



});


app.get('/get_shelters', async(req, res) =>{



    const [rows] = await db.query("select name, id from shelters");

    if(rows.length ===0 ){

        console.log("No returned rows.")
        return res.status(200).json([]);
    }

    return res.status(200).json(rows)


});





app.put('/complete_shelter_profile/',
    authenticateToken,
    
    checkShelter,
    upload.single("image_file"), async (req,res) =>{


        const user_id = req.user.id;

  const { name, address, city, state, zip,
        about, phone, website, mission, hours } = req.body;


    let image_url = null;

    if(req.file){

        image_url = `/images/${req.file.filename}`;
    }


    const [result] = await db.query(
    `update shelters 
     set name = ?, address = ?, city = ?, state = ?, zip = ?, about = ?, 
         phone = ?, website = ?, mission = ?, hours = ?, image_url = ?
     where user_id = ?`,
    [name, address, city, state, zip, about, phone, website, mission, hours, image_url, user_id]
);

if(result.affectedRows === 0){

        console.log("Update shelter info was unsuccessful");
        return res.status(400).json({error: "error occured in put create-shelter-profile route"});
   
}
    return res.status(200).json({message: "shelter profile updated"});


});







app.get('/shelter_search', async (req,res) =>{

    const {search_city} = req.query;


    if(!search_city){

        const [rows] = await db.query('select * from shelters');

        if(rows.length ===0){


           return res.status(400).json({error: "unable to get shelters"})
        }

        return res.status(200).json(rows);
    }

    else{


        const parameters = [`%${search_city}%`, `%${search_city}%`]


        const [rows] = await db.query('select * from shelters where city like ? or zip like ?', parameters);


          if(rows.length ===0){


           return res.status(400).json({error: "unable to get shelters"})
        }

        return res.status(200).json(rows);

    }

})



app.get('/user_info', async (req, res) =>{


    const {name, role} = req.query;

    const [rows] = await db.query('select * from users where name = ? and role = ?', [name, role])

    if(rows.length ===0){

        return res.status(400).json({error: "There was no match inside the database."})
    }

    return res.status(200).json(rows[0].id);

})


app.post('/conversations_start',
    authenticateToken,
    checkAdopter, async (req,res) =>{

    console.log(req.body);

    const user_id = req.user.id;

    const { shelter_id} = req.body; 

    if(!user_id || !shelter_id){

        console.log("user id and shelter id not passed to conversations start");
        return
    }

    console.log("insert inputs: ", {user_id, shelter_id} );
    
    const [rows] = await db.query("select * from conversations where user_id = ? and shelter_id =?", [user_id, shelter_id]);

    console.log(rows);

    if(rows.length !==0){

        return res.status(200).json({
            conversation_id:
            
            rows[0].id});
    }


    const [result] = await db.query("insert into conversations (user_id, shelter_id) values(?,?)" , [user_id, shelter_id]);

        console.log('insert ok: ', result)


    return res.status(200).json({

        conversation_id: result.insertId
    })

})



app.post('/messages_contact',
    authenticateToken,
    checkShelter, async(req, res) =>{

    console.log(req.body);

    const sender_id = req.user.id;
    const sender_type = req.user.role;

    const { message_text, conversation_id} = req.body;


    console.log("Message Payload:", { sender_id,
                sender_type,
                message_text,
                conversation_id

            })


    const [result] = await db.query('insert into messages (sender_type, message_text, conversation_id, sender_id) values (?,?,?, ?)', [sender_type, message_text, conversation_id, sender_id]);
    console.log('insert ok: ', result)

    if(result.affectedRows ===0){

        return res.status(400).json({error: "Unable to add message."})
    }

    return res.status(200).json({
        message_id : result.insertId
    })


}
);







app.post('/messages_contact_adopter',
    authenticateToken,
    checkAdopter, async(req, res) =>{

    console.log(req.body);

    const sender_id = req.user.id;
    const sender_type = req.user.role;

    const { message_text, conversation_id} = req.body;


    console.log("Message Payload:", { sender_id,
                sender_type,
                message_text,
                conversation_id

            })


    const [result] = await db.query('insert into messages (sender_type, message_text, conversation_id, sender_id) values (?,?,?, ?)', [sender_type, message_text, conversation_id, sender_id]);
    console.log('insert ok: ', result)

    if(result.affectedRows ===0){

        return res.status(400).json({error: "Unable to add message."})
    }

    return res.status(200).json({
        message_id : result.insertId
    })


}
);



app.get("/debug-db", async (req, res) => {
  const [rows] = await db.query(`
    SELECT DATABASE() as db, @@port as port, @@hostname as host
  `);
  res.json(rows[0]);
});




app.get('/check_favorite',
    authenticateToken,
    checkAdopter, async (req, res) =>{

    const {pet_id} = req.query;

    const user_id = req.user.id;


    const [rows] = await db.query('select * from favorites where user_id =? and pet_id = ?', [user_id, pet_id]);

    if(rows.length ===0){
                
        console.log("no rows were matched in check_favorite");
        return res.status(200).json(null);
    }

    return res.status(200).json(rows[0]);


})


app.post('/favorites',
    authenticateToken,
    checkAdopter, async (req, res) =>{

    const { pet_id} = req.body;

    const user_id = req.user.id;

    const [result] = await db.query('insert into favorites (user_id, pet_id) values (?,?)', [user_id, pet_id]);

    if(result.affectedRows ===0){

       return res.status(400).json({error: "insert into favorites was unsuccessful"})
    }

    return res.status(200).json({id: result.insertId});

});




app.delete('/favorites/:id', authenticateToken,
    checkAdopter, async (req, res) =>{

    const user_id = req.user.id;


    const {id} = req.params;

    if(!id){

       return res.status(400).json({error: "no id was sent to the delete favorites route."})
    }

    const [result] = await db.query('delete from favorites f where f.id = ? and f.user_id =?', [id, user_id]);

    if(result.affectedRows === 0){

        return res.status(400).json({error: "the db delete favorite operation was unsuccessful."})
    }

    return res.status(200).json({message: "deletion was successful."
    })
})





app.get('/users_favorites/',
    authenticateToken,
    checkAdopter, async (req, res) =>{

const user_id = req.user.id


const sql = `select f.id as favorite_id, f.pet_id as pet_id, p.name as pet_name, p.image_url as pet_image, p.type as pet_type, p.breed as pet_breed, p.age as pet_age, s.name as shelter_name
from favorites f inner join pets p on f.pet_id = p.id
inner join shelters s on s.id = p.shelter_id
where f.user_id = ?`


const [rows] = await db.query(sql, [user_id]);
console.log("here is your favorite list about to return to front end", rows);

if(rows.length===0){
console.log("no returned rows in favorites.");
return res.status(200).json([]);
   
};

return res.status(200).json(rows);

});



app.post('/adoption_request',
    authenticateToken,
    checkAdopter, async (req, res) =>{


        const user_id = req.user.id;


    const { pet_id, why_adopt, home_type, pet_experience, activity_level, yard, hours_alone, other_pets, other_children} = req.body;

    const [result] =  await db.query(
`
INSERT INTO applications
(
user_id, pet_id, message,
home_type, experience, activity_level,
yard, hours_alone, other_pets, children
)

VALUES
(
?, ?, ?, ?,
?, ?, ?,
?, ?, ?
)
`,
[
user_id, pet_id, why_adopt,
home_type, pet_experience, activity_level,
yard, hours_alone, other_pets, other_children
]
);

if(result.affectedRows === 0){

    console.log("No rows were affected");
    return res.status(404).json({error: "Insert was unsuccessful in /adoption_requests"})
}

return res.status(200).json({message: "Insert was successful in /adoption_requests"})



})



app.get('/user_applications/', 
    authenticateToken,
    checkAdopter, async (req, res) =>{

   const id = req.user.id;

   const sql = `select applications.*, p.name as pet_name, p.type as pet_type, s.name as shelter_name, p.image_url as pet_image from applications
   inner join pets p on p.id = applications.pet_id 
   inner join shelters s on s.id = p.shelter_id
   where applications.user_id = ?`

   const [rows] = await db.query(sql, [id]);

   if(rows.length ===0){

    return res.status(200).json([]);
   }

   return res.status(200).json(rows);

})





app.delete('/user_applications/:id',
    authenticateToken,
    checkAdopter, async (req, res) =>{



    const user_id = req.user.id;
    const {id} = req.params;
    console.log(id);

    if(!id){

       return res.status(404).json({error: "id was not passed to user applicaitons delete route."
        })
    }

    const  [result] = await db.query(`delete from applications where applications.id = ? and applications.user_id =?`, [id, user_id]);

    console.log("result is: ", result);

    if(result.affectedRows === 0){

       return res.status(404).json({error: "No rows were deleted"});
    }

    console.log("deletion area hit")
    return res.status(200).json({message: "Deletion was successful."})
})





app.get('/conversations/',
    authenticateToken,
    checkAdopter, async(req, res) =>{



    try{

    const id = req.user.id;

    if(!id){

        console.log("No ID was provided to conversations");
        return res.status(400).json({error: "No ID was passed to this route"});
    }


    const sql = `select conversations.*, s.name as shelter_name from conversations inner join 
    shelters s on s.id = conversations.shelter_id where conversations.user_id = ?`

    const [rows] = await db.query(sql, [id])

    if(rows.length ===0){

        console.log("No rows were returned from converations.")
        return res.status(200).json([]);
    }

    return res.status(200).json(rows);

}catch(err){

    console.log("Error:", err);
    return res.status(400).json("An error occurred in conversations route.");
}

    
}
);



app.get('/messages/:id',
    authenticateToken,
    checkAdopter, async( req, res) =>{

        const user_id = req.user.id;


    const {id} = req.params;
    if(!id){
        console.log("No ID was provided to messages");

    };


    const sql = `select m.* from messages m inner join conversations c on c.id = m.conversation_id where m.conversation_id = ? and c.user_id = ?`

    const [rows] = await db.query(sql, [id, user_id]);

    if(rows.length ===0){

        console.log("No rows were returned from the messages table");
        return res.status(200).json([]);
    }

    return res.status(200).json(rows);


});



app.post('/messages',
    authenticateToken,
    checkAdopter, async (req, res) =>{


    console.log(req.body);

    const sender_id = req.user.id;
    const sender_type = req.user.role;

    const { conversation_id, message_text} = req.body;

    if(!sender_id||!conversation_id||!message_text||!sender_type){

        console.log("Items were missing in the request body");
        return res.status(400).json("Items were missing in the request body");
    }

    const [result] = await db.query('insert into messages (sender_id, conversation_id, message_text, sender_type) values (?,?,?,?)', [sender_id, conversation_id, message_text, sender_type]);
    console.log(result);

    if(result.affectedRows ===0){

        console.log("Nothing was inserted into messages table");
        return res.status(400).json({error: "error occured in post messages route"});
    };

    return res.status(200).json({id: result.insertId});


});


app.put('/adopters_account_name',
    authenticateToken,
    checkAdopter, async (req,res) =>{


    const user_id = req.user.id;
    const {name} = req.body;
    console.log(req.body);

    const [result] = await db.query('update users set name = ? where id = ?', [name, user_id]);

    if(result.affectedRows === 0){
        console.log("The adopters name could not be changed.");
        return res.status(404).json({error: "the update adopter's name operation could not be done successfully."});
    };

    return res.status(200).json({message: "successfully updated the user's name"});


});




app.put('/adopters_account_email',
    authenticateToken, 
    checkAdopter, async (req, res) =>{


    const user_id = req.user.id;

    const { email} = req.body;

    const [result] = await db.query('update users set email = ? where id =?', [email, user_id]);

    if(result.affectedRows === 0){

        console.log("The adopters email could not be changed.");
        return res.status(404).json({error: "the update adopter's email operation could not be done successfully."});
    };

    return res.status(200).json({message: "update adopter's email successful"});
})




app.put(`/adopters_account_password`,
    authenticateToken, checkAdopter, async (req, res) =>{


        const user_id = req.user.id;

    const {new_password, confirm_password, old_password} = req.body;


    const [user_password] = await db.query('select * from users where id = ?', [user_id]);

    if(user_password.length ===0){

        return res.status(400).json({error: "no user match."});
    }

    const password_check = await bcrypt.compare( old_password, user_password[0].password);

    if(!password_check){
  return res.status(400).json({error: "invalid password"});

    }


    const hashedPassword = await bcrypt.hash(new_password,10);
    


    const [result] = await db.query('update users set password = ? where id = ?', [hashedPassword, user_id]);

     if(result.affectedRows === 0){

        console.log("The adopter's passord could not be changed.");
        return res.status(404).json({error: "the update adopter's password operation could not be done successfully."});
    };

    return res.status(200).json({message: "update adopter's password successful"});

});




app.delete('/adopters_account_delete/',
    authenticateToken,
    checkAdopter, async(req, res) =>{


    const id = req.user.id;


    await db.query('delete from applications where user_id = ?', [id]);


    await db.query(`delete from messages where conversation_id in (
        select id from conversations where user_id = ?)`, [id]);


            await db.query('delete from conversations where user_id = ?', [id]);

            await db.query('delete from favorites where user_id = ?', [id]);


    const [result] = await db.query('delete from users where id = ?', [id]);

    if(result.affectedRows === 0){

        console.log("Could not delete the user's account");
        return res.status(404).json({error: "the delete user's account operation could not be done successfully."});
    };

    return res.status(200).json({message: "deletion of adopter's account successful"});



});



app.get(`/get_shelter_pets/`,
    authenticateToken,
    checkShelter, async (req, res) =>{

    const id = req.user.id;

    const sql = `select p.image_url as pet_image, p.id as pet_id, p.name, p.breed, p.type, p.age,

    case 
    when exists(
    
    select 1 from applications a 
    where a.pet_id = p.id
    and a.status = "approved") then "Not Available"

    when exists (
    select 1 from applications a
    where a.pet_id = p.id
    and a.status = "under review") then "Pending"

    else "Available"
    end as adoption_state
    from pets p inner join shelters s 
    on p.shelter_id = s.id
    inner join users on s.user_id = users.id
    where users.id =?`

    const [rows] = await db.query(sql, [id]);

    console.log(rows)
    if(rows.length ===0){

        console.log("No rows matched in get shelters pets");
        return res.status(200).json([]);
    };

    return res.status(200).json(rows);
})







app.get('/shelters_applications/',
    authenticateToken,
    checkShelter, async (req, res) =>{


    const id = req.user.id;

    const sql = `select a.*, p.name as pet_name, p.image_url as pet_image, applyers.name as applicant_name, p.type as pet_type,
    a.status as application_status
from applications a
inner join pets p on p.id = a.pet_id
inner join shelters s on s.id = p.shelter_id
inner join users shelter_users on shelter_users.id = s.user_id
inner join users applyers on a.user_id = applyers.id
where shelter_users.id = ?;`

const [rows] = await db.query(sql, [id]);

console.log(rows)
    if(rows.length ===0){

        console.log("No rows matched in get shelter applications");
        return res.status(200).json([]);
    };

    return res.status(200).json(rows);


})



app.get('/get_application_details/:id',
    authenticateToken,
    checkShelter, async(req,res) =>{


        const user_id = req.user.id;


    const {id} = req.params;

    const sql = `select a.*, p.image_url as pet_image, p.name as pet_name, p.type as pet_type, p.breed as pet_breed, p.size as pet_size,
    applicant.name as applicant_name from applications a inner join pets p on a.pet_id = p.id inner join users applicant on applicant.id = a.user_id
    inner join shelters s on s.id = p.shelter_id where a.id = ? and s.user_id = ?;`

    const [rows] = await db.query(sql, [id, user_id]);

    console.log(rows)
    if(rows.length ===0){

        console.log("No rows matched in get shelter application details");
        return res.status(200).json([]);
    };

    return res.status(200).json(rows[0]);


});


app.put('/applications_status',
    authenticateToken,
    checkShelter, async (req,res) =>{

        const user_id = req.user.id;

    const {app_id, status} = req.body;

    const sql = `update applications a inner join pets p on p.id = a.pet_id inner join shelters s on s.id = p.shelter_id set a.status = ? where a.id = ? and s.user_id = ?`

    const [result] = await db.query(sql, [status, app_id, user_id]);

        if(result.affectedRows === 0){

        console.log("Could not update the the application status");
        return res.status(404).json({error: "Could not update the the application status"});
    };

    return res.status(200).json({message: "Updating the application status was successful"});

});




app.get('/shelters_side_conversations/',
    authenticateToken,
    checkShelter, async (req,res) =>{


    const user_id = req.user.id;

    const [rows] = await db.query('select id from shelters where user_id = ?', [user_id]);


      if(rows.length === 0){

        console.log("Could not get the shelter id");
        return res.status(404).json({error: "Could not get the shelter id"});
    };



    const shelt_id = rows[0].id;

    const sql = `select conversations.*, users.name as user_name from conversations 
inner join users on users.id = conversations.user_id where conversations.shelter_id = ?;`


const [rows2] = await db.query(sql, [shelt_id]);


 if(rows2.length === 0){

        return res.status(200).json([]);


    };

     return res.status(200).json(rows2);


});


app.get('/get_shelters_messages/:conv_id',
    authenticateToken,
    checkShelter, async (req, res) =>{

    const {conv_id} = req.params;


    const sql = `select messages.*, users.name as user_name from messages 
    inner join users on users.id = messages.sender_id where conversation_id = ?`

    const [rows] = await db.query(sql, [conv_id]);

     if(rows.length === 0){

        console.log("Could not get messages");
        return res.status(404).json({error: "Could not get messagess"});
    };

     return res.status(200).json(rows);

})


app.get('/shelter_info/',
    authenticateToken,
    checkShelter, async (req,res) =>{

        const user_id = req.user.id;


    const sql = `select * from shelters s where s.user_id = ?`

    const [rows] = await db.query(sql, [user_id]);


    if(rows.length === 0){

        console.log("Could not get shelters");
        return res.status(404).json({error: "Could not get shelters"});
    };

     return res.status(200).json(rows[0]);
})



app.put('/edit_shelter_info',
    authenticateToken,
    checkShelter, upload.single("image_file"), async (req, res) =>{


    const image_url = req.file? `/images/${req.file.filename}`:null;

    const user_id = req.user.id;

    const { name, address, city, state, zip, about, phone, website, mission, hours } = req.body;


    const [result] = await db.query(
  `UPDATE shelters 
   SET name = ?, address = ?, city = ?, state = ?, zip = ?, about = ?, phone = ?, website = ?, mission = ?, hours = ?, image_url = COALESCE(?, image_url)
   WHERE user_id = ?`,
  [name, address, city, state, zip, about, phone, website, mission, hours, image_url, user_id]

);


 if(result.affectedRows === 0){

        console.log("Could not update the shelter info");
        return res.status(404).json({error: "Could not update the shelter info"});
    };

    return res.status(200).json({message: "Updating the shelter info was successful"});



})



app.put('/shelter_user_name/',
    authenticateToken,
    checkShelter, async (req,res) =>{


    const user_id = req.user.id;

    const {name} = req.body;

    const [result] = await db.query('update users set name = ? where id = ?', [name, user_id]);

    

 if(result.affectedRows === 0){

        console.log("Could not update the user info");
        return res.status(404).json({error: "Could not update user info"});
    };

    return res.status(200).json({message: "Updating the user info was successful"});


})




app.put('/shelter_user_email/',
    authenticateToken,
    checkShelter, async (req,res) =>{

    const user_id = req.user.id

    const {email} = req.body;

    const [result] = await db.query('update users set email = ? where id = ?', [email, user_id]);

    

 if(result.affectedRows === 0){

        console.log("Could not update the user info");
        return res.status(404).json({error: "Could not update user info"});
    };

    return res.status(200).json({message: "Updating the user info was successful"});


});






app.put('/shelter_user_password/',
    authenticateToken,
    checkShelter, async (req,res) =>{


    const user_id = req.user.id;

    const [user_rows] = await db.query('select * from users where id = ?', [user_id]

    );

    if(user_rows.length ===0 ){

       return res.status(400).json({error: "No user id was detected."})
    };

    


    const {oldPassword,newPassword} = req.body;

    const passwordMatch = await bcrypt.compare(oldPassword, user_rows[0].password);



     if(!passwordMatch){

        console.log("Passowrd is incorrect");
        return res.status(404).json({error: "Current Password is incorrect"});
    };

    const hashedPassword = await bcrypt.hash(newPassword, 10);



    const [result] = await db.query('update users set password = ? where id = ?', [hashedPassword, user_id]);

    

 if(result.affectedRows === 0){

        console.log("Could not update the user info");
        return res.status(404).json({error: "Could not update user info"});
    };

    return res.status(200).json({message: "Updating the user info was successful"});


})



app.delete('/shelter_user_delete/',
    authenticateToken,
    checkShelter, async (req, res) =>{


    const user_id = req.user.id;


    await db.query(`delete from messages where conversation_id in (
        
        select id from conversations where shelter_id in(
        
        select id from shelters s where s.user_id = ?))`, [user_id]);


             await db.query(`delete c from conversations c inner join shelters s on s.id = c.shelter_id where s.user_id = ?`,
            [user_id]
        )


       

              await db.query(`delete a from applications a inner join pets p on p.id = a.pet_id inner join
                shelters s on s.id = p.shelter_id inner join users u on u.id = s.user_id where s.user_id = ?`, [user_id]);


                            await db.query(`delete f from favorites f inner join pets p on p.id = f.pet_id
                                inner join shelters s on s.id = p.shelter_id where s.user_id = ?`, [user_id]);

                            
                            await db.query(`delete p from pets p inner join shelters s on s.id = p.shelter_id where s.user_id = ?`, [user_id]);

                        


        await db.query(`delete from shelters where user_id = ?`, [user_id]);

    

    const [result] = await db.query('delete from users where id = ?', [user_id]);


    


    if(result.affectedRows === 0){

        console.log("Could not delete the user");
        return res.status(404).json({error: "Could not delete the user"});
    };

    return res.status(200).json({message: "Deletion was successful"});
});



app.get('/shelter_from_pet/:pet_id', async (req,res)=>{


    const {pet_id} = req.params;

 
    const sql = `select s.id as shelter_id, s.name as shelter_name, p.id as pet_id, p.name as pet_name, p.image_url as pet_image,
    p.breed as pet_breed from pets p inner join shelters s on s.id = p.shelter_id where p.id = ?`


    const [rows] = await db.query(sql, [pet_id]);


      if(rows.length === 0){

        console.log("No matching rows.");
        return res.status(404).json({error: "No matching rows."});
    };

    return res.status(200).json(rows[0]);


}

);



app.post('/message_about_pet',
    authenticateToken,
    checkAdopter, async (req, res) =>{


    let conv_id = null;

    const user_id = req.user.id;
    const role = req.user.role;

    const { shelter_id, pet_id, reason, message_text} = req.body;


    const [rows] = await db.query('select * from conversations where user_id =? and shelter_id =? and pet_id = ?', [user_id, shelter_id, pet_id]);

    if(rows.length >0){

        conv_id = rows[0].id;
    }else{

        const [result] = await db.query('insert into conversations (user_id, shelter_id, pet_id, reason) values (?,?,?,?)', [user_id, shelter_id, pet_id, reason]);
        conv_id = result.insertId;
    }



    const [result2] = await db.query('insert into messages (sender_id, sender_type, message_text, conversation_id)  values (?,?,?,?)', [user_id, role, message_text, conv_id]);
    
    if(result2.affectedRows === 0){

        console.log("Could not add message");
        return res.status(404).json({error: "Could not add message"});
    };

    return res.status(200).json({message: "Message successfully created"});

}
);



app.get('/shelter-dashboard/',
    authenticateToken,
    checkShelter, async (req, res) =>{


    const user_id = req.user.id;

    let shelt_id = null;




    

    const [rows] = await db.query('select s.id as shelt_id, u.id as user_id from shelters s inner join users u on s.user_id = u.id where u.id = ?', [user_id]);

    if(rows.length > 0){

        shelt_id = rows[0].shelt_id;


    }


    console.log("user id: ", user_id);
    console.log("user id: ", shelt_id);
        console.log("rows: ", rows);

    if(rows.length===0){

        console.log("Error: no shelter id was passed");
        return res.status(404).json({error: "Must provide shelter ID"});

    }


        

    const [rows2] = await db.query('select count(*) as total_pets from pets where pets.shelter_id = ?', [shelt_id]);



    const sql = `select count(*) as total_applications, sum(case when applications.status = "under review" then 1 else 0 end) as pending_applications,
    sum(case when applications.status = "rejected" then 1 else 0 end) as rejected_applications,
    sum(case when applications.status = "approved" then 1 else 0 end) as approved_applications from applications
    
    inner join pets p on p.id = applications.pet_id
    inner join shelters s on s.id = p.shelter_id
    where s.id = ?
    `


    const [rows3] = await db.query(sql, [shelt_id]);


    const sql2 = `select sum(case when type = "Dog" then 1 else 0 end) as dog_count,
    sum(case when type = "Cat" then 1 else 0 end) as cat_count,
    sum(case when type not in ("Dog", "Cat") then 1 else 0 end) as other_count
    from pets p where p.shelter_id = ?
    `

    const [petType] = await db.query(sql2, [shelt_id]
    );

    const [rows4] = await db.query('select count(*) as total_conversations from conversations where shelter_id = ?', [shelt_id]);


    const sql3 = `
select count(*) as favorite_count, p.name as favorite_pet_name, p.id as pet_id from pets p inner join favorites f on f.pet_id = p.id where p.shelter_id = ?
group by p.id
order by favorite_count desc limit 5;`

 const [rows5] = await db.query(sql3, [shelt_id]
    );




    const sql4 = `select p.name as application_pet_name, a.id as application_id, a.created_at as application_created_at, u.name as application_user_name, a.message application_message from applications a inner join pets p on 
p.id = a.pet_id inner join users u on u.id = a.user_id where p.shelter_id = ?
order by a.created_at desc limit 5;`


 const [rows6] = await db.query(sql4, [shelt_id]
    );

 

    const sql5 = `select p.name as conversation_pet_name, c.id as conversation_id, s.name as conversation_shelter_name, u.name as conversation_user_name,
c.created_at as conversation_created_at, c.reason as conversation_reason from conversations c inner join pets p 
on p.id = c.pet_id inner join users u on u.id = c.user_id inner join shelters s on s.id = c.shelter_id where c.shelter_id = ?
order by c.created_at desc limit 5;`


 const [rows7] = await db.query(sql5, [shelt_id]
    );




res.json({total_pets: rows2[0].total_pets,

    total_applications: rows3[0].total_applications,
    pending_applications: rows3[0].pending_applications,
    rejected_applications: rows3[0].rejected_applications,
    approved_applications: rows3[0].approved_applications,


    dog_count: petType[0].dog_count,
    cat_count: petType[0].cat_count,
    other_count: petType[0].other_count,
    


    total_conversations: rows4[0].total_conversations,


    favorite_pets: rows5,


    recent_applications: rows6,

    recent_conversations: rows7

})


})



app.get('/adopter_dashboard_info/',
    authenticateToken,
    checkAdopter, async (req,res) =>{


    const user_id = req.user.id;

    const sql1 = `select count(*) as favorite_count from favorites f
    inner join users u on u.id = f.user_id
    where u.id = ?`

    const [rows1] = await db.query(sql1, [user_id]);


    const sql2= `select count(*) as application_count from applications a
    inner join users u on u.id = a.user_id
    where u.id = ?`

     const [rows2] = await db.query(sql2, [user_id]);



      const sql3= `select count(*) as conversation_count from conversations c
    inner join users u on u.id = c.user_id
    where u.id = ?`

     const [rows3] = await db.query(sql3, [user_id]);


     
     const sql4= `select a.id as application_id, p.name as application_pet_name, s.name as application_shelter_name,
        a.status as application_status, a.created_at as application_created_at
        from applications a inner join pets p on p.id = a.pet_id 
        inner join shelters s on s.id = p.shelter_id inner join users u on u.id = a.user_id
        where u.id = ?
        order by a.created_at desc
        limit 5 
     `

     const [rows4] = await db.query(sql4, [user_id]);



     
      const sql5= `
      select conversation_id, conversation_pet_name, conversation_shelter_name,
      conversation_reason, recent_message from(
      
      
      select c.id as conversation_id, p.name as conversation_pet_name, s.name as conversation_shelter_name, 
      c.reason as conversation_reason, m.message_text as recent_message,
      m.created_at as message_created_at,

      row_number() over (partition by c.id order by m.created_at desc) as rk

      from conversations c left join pets p on p.id = c.pet_id inner join shelters s on s.id = c.shelter_id
      inner join messages m on m.conversation_id = c.id inner join users u on u.id = c.user_id
      where u.id = ?
) as t

where rk = 1
order by message_created_at desc
limit 5;
      `

      const [rows5] = await db.query(sql5, [user_id]);




      
      const sql6= `select f.id as favorites_id, p.name as favorite_pet_name, s.name as favorite_shelter_name
      
      from favorites f inner join pets p on p.id = f.pet_id inner join shelters s on s.id = p.shelter_id inner join users u
      on u.id = f.user_id
      where u.id =?
      order by f.id desc
      limit 5;`

     const [rows6] = await db.query(sql6, [user_id]);



     res.status(200).json({

        favorite_count: rows1[0].favorite_count,
        application_count: rows2[0].application_count,
        conversation_count: rows3[0].conversation_count,

        recent_applications: rows4,
        recent_conversations: rows5,
        favorite_pets: rows6


     })




});


app.delete('/shelters_pet_delete/:id',
    authenticateToken,
    checkShelter, async(req,res) =>{


        const user_id = req.user.id;

    const {id} = req.params;



    const [result] = await db.query(`delete p from pets p inner join shelters s
        on p.shelter_id = s.id where p.id = ? and s.user_id = ?`, [id, user_id]);

      if(result.affectedRows === 0){

        console.log("Could not delete the pet");
        return res.status(404).json({error: "Could not delete the pet."});
    };

    return res.status(200).json({message: "Deletion was successful"});

});


app.listen(port, () =>{

    console.log("Server is listening on port: ", port)
})

