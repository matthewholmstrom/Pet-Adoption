import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getUser } from "../components/Auth";



export default function PetInfo(){

    const user = getUser();


    const token = localStorage.getItem("token");
    
    

    const user_role = user?.role;

    const {id} = useParams();
    console.log(id);
    const [pet, setPet] = useState([]);
    const [favorite, setFavorite] = useState(false);
    
    const [favoriteId, setFavoriteId] = useState(null);


    useEffect(() =>{


        const getPet = async () =>{

            const res = await fetch(`/pet_info/${id}`);
            
            const data = await res.json();
            console.log(data);

            if(res.ok){

                setPet(data);
            }
        } 
        getPet();
    }, [id]);



    useEffect(()=>{


        if(!user){
            return
        }

        const users_name = user.name;




const checkFavorite = async () =>{

    


    const res = await fetch(`/check_favorite?pet_id=${id}`,
        {headers: {"Authorization": "Bearer " + token}}
    );
    const data = await res.json();

    if(!res.ok){

        console.log("Error with the response from checkFavorite");
        return
    }

    if(data === null){

        setFavorite(false);
        setFavoriteId(null);
        return
    }

    setFavorite(true);
    setFavoriteId(data.id);

};

checkFavorite();

    },[token, id]);


    const AddFavorite = async () =>{


    const res = await fetch('/favorites',{

            method: "POST",
            headers:{'Content-Type': 'application/json',
                "Authorization" : "Bearer " + token
            },
            body: JSON.stringify({
                pet_id: id
    })
        })

    const data = await res.json();

    if(!res.ok){

        console.log("Error: error in the response from AddFavorite.")
        return
    }

    setFavorite(true);
    setFavoriteId(data.id);

        }




        const handleDelete = async (fav_id) =>{

            const res = await fetch(`/favorites/${fav_id}`, {
            
                method: "Delete",

                headers: {"Authorization": "Bearer " + token}

            }  )


            const data = await res.json();
            if(!res.ok){
                console.log("Error in the response from handleDelete.");
                return
            }


            setFavorite(false);
            setFavoriteId(null);
        }
    


        const handleFavorite = (fav_id) =>{




            if(favorite){

                handleDelete(fav_id);
            }
            else{


                AddFavorite();
            }

        }

    return(
        
        
        
        <div className="more-pet-info-main">


        <Sidebar></Sidebar>


        
<div className="more-pet-info-right">


    <div className="more-pet-info-right-wrapper">
    



    <div className="more-pet-info-left-column">



<div className="more-pet-info-img-cont">
        <img src= {`http://localhost:5009${pet.image_url}`}></img>
        </div>


<div className="pet-info-btn-cont">

    {!user ?
(
    <div className="pet-info-anchors">
<a href="/login">Login in To Favorite</a>
<a href="/login">Login To Apply to Adopt</a>
<a href="/login">Login To Message Shelter</a>
</div>
): user_role === "shelter"?


(
    <div className="pet-info-anchors">

        <button disabled>
        Must be an adopter to Favorite
        </button>



        <button disabled>
        Must be an adopter to Favorite
        </button>

        <button disabled>
        Must be an adopter to Favorite
        </button>

</div>
):
(

      <div className="pet-info-anchors">
    <button onClick={()=> handleFavorite(favoriteId)} className={favorite? "favorited-button": "not-favorited-button"}>Favorite</button>

<a href={`/pet_apply/${id}`}>Apply To Adopt</a>
<a href={`/message_about_pet/${id}`}>Message Shelter</a>
</div>


)

    }


</div>


    </div>



    <div className="more-pet-info-right-column">



<div className="top-row-pet-info-grid1">


<h1>{pet.name}</h1>

<p>{pet.type} * {pet.breed} * Age: {pet.age}</p>

</div>



<div className="second-row-pet-info-grid1">


<h3 className="pet-info-label">Energy</h3>

<p>{pet.energy_level}</p>


</div>



<div className="second-row-pet-info-grid2">


<h3 className="pet-info-label">Temperamant</h3>

<p>{pet.temperament}</p>

</div>







<div className="third-row-pet-info-grid1">


<h3 className="pet-info-label">Attention Needs</h3>

<p>{pet.attention_needs}</p>


</div>



<div className="third-row-pet-info-grid2">


<h3 className="pet-info-label">Size</h3>

<p>{pet.size}</p>

</div>





<div className="fourth-row-pet-info-grid1">


<h3 className="pet-info-label">Good With Kids</h3>

<p>{pet.good_with_kids}</p>


</div>



<div className="fourth-row-pet-info-grid2">


<h3 className="pet-info-label">Good With Pets</h3>

<p>{pet.good_with_pets}</p>

</div>


<div className="fifth-row-pet-info-grid1">


<h3 className="pet-info-label">Training Needs</h3>

<p>{pet.training_status}</p>


</div>



<div className="fifth-row-pet-info-grid2">


<h3 className="pet-info-label">Maintainance Level</h3>

<p>{pet.maintenance_level}</p>

</div>






<div className="sixth-row-pet-info-grid">


<h3 className="pet-info-label">Ideal Home</h3>

<p>{pet.home_type}</p>

</div>





<div className="seventh-row-pet-info-grid">


<h3 className="pet-info-label">About</h3>

<p>{pet.description}</p>

</div>




    </div>



</div>


</div>


        </div>
        
        


    )

}