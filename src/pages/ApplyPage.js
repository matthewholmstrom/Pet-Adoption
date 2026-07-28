import React from "react";
import { useState, useEffect } from "react";
import { getUser } from "../components/Auth";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";



export default function ApplyPage(){


    const [formData, setFormData] = useState({why_adopt: "", home_type: "", pet_experience: "", activity_level: "", yard: "", hours_alone: "", other_pets: "", other_children: ""

    });

    const [toast, setToast] = useState(null);

    const person = getUser();

    const user_id = person.userId;

    const [pets, setPets] = useState({})

    const {pet_id}= useParams();





    useEffect(() =>{

        
        if(!pet_id){

            console.log("No pet id was received.");
            return
        }

        const getPet = async () =>{


            const res = await fetch(`/pet_info/${pet_id}`);

            const data = await res.json();

            if(!res.ok){

                return
            }

            

            setPets(data);

            
        };

        getPet();
    }, [pet_id]);






    const handleSubmit = async (e) =>{

        e.preventDefault();
            console.log("SUBMIT FIRED");


        const res = await fetch('/adoption_request',
{


    method:     "POST",
    headers:{
        "Content-Type": 'application/json'
    },
    body: JSON.stringify({...formData,
        pet_id: Number(pet_id),
        user_id: Number(user_id)
    })
}
        )

        const data = await res.json();
        
        console.log(data);

        if(!res.ok){

              setToast({
                    type: "error",
                    message: "There was an error submitting your application."
                })
                return
        }

        console.log("setting success toast");

        setFormData({why_adopt: "", home_type: "", pet_experience: "", activity_level: "", yard: "", hours_alone: "", other_pets: "", other_children: ""

    })

          setToast({
                    type: "success",
                    message: "The application was submitted successfully."
                })

    }






    return(


        <div className="apply-page-main">


{toast &&(

    <Toast toast ={toast}
    closeToast={() =>setToast(null)}/>
)}


<Sidebar></Sidebar>

            

<div className="apply-page-right">

    <div className="apply-page-right-space-inside">
<h1>Pet Adoption Application</h1>
<p>Complete this application to apply for pet adoption.</p>
</div>

    <form className="adoption-application-form" onSubmit={handleSubmit}>



<div className="apply-page-form-middle">





<div className="apply-page-form-top-text-area">
<label htmlFor="adoption-text-area" >

    Why do you want to adopt this pet?
</label>

<textarea id="adoption-text-area"
value={formData.why_adopt}

placeholder="Tell us your story..."
onChange={(e) => setFormData(prev=>({


    ...prev, why_adopt: e.target.value
}))}
required>

</textarea>

</div>



<div className="apply-page-form-top-first-select">

<label>
Home Type
</label>

<select

required
value = {formData.home_type}
onChange={(e)=> setFormData(prev => ({

    ...prev, home_type: e.target.value
}))}

>




<option value= "">

    Select
</option>

<option value= "House">

    House
    
</option>

<option value= "Apartment">

    Apartment
</option>

<option value= "Condo">

    Condo
</option>

<option value= "Other">

    Other
</option>


</select>

</div>




<div className="apply-page-form-top-first-select">


<label>
Pet Experience
</label>

<textarea className="form-application-second-textarea"
required
value={formData.pet_experience}
onChange={(e) => setFormData(prev =>({

    ...prev, pet_experience: e.target.value
}))}>


</textarea>

</div>





<div className="apply-page-form-top-first-select">


<label>
    Activity Level
</label>

<select
required
value={formData.activity_level}
onChange={(e) => setFormData(prev =>({


    ...prev, activity_level: e.target.value
}))}
>

<option value= "">

    Select
</option>

<option value= "Low">

    Low
    
</option>

<option value= "Moderate">

    Moderate
</option>

<option value= "High">

    High
</option>



</select>

</div>


<div className="apply-page-form-top-first-select">


<label>Do you have a yard?</label>


<select
required
value={formData.yard}
onChange={(e) => setFormData(prev =>({
    ...prev, yard: e.target.value 
}))}

>
 

<option value= "">

    Select
</option>

<option value= "Yes">

    Yes
    
</option>

<option value= "No">

    No
</option>

</select>

</div>


<div className="apply-page-form-top-first-select">

<label>Hours alone per day</label>

<input className="hours-alone"
required
value={formData.hours_alone}
onChange={(e) => setFormData(prev =>({

    ...prev, hours_alone: e.target.value
}))}>


</input>


<label>Other Pets</label>


<select
required
value={formData.other_pets}
onChange={(e)=> setFormData(prev =>({...prev, other_pets: e.target.value}))}
>

<option value= "">

    Select
</option>

<option value= "Yes">

    Yes
    
</option>

<option value= "No">

    No
</option>


</select>


</div>

<div className="apply-page-form-top-first-select">


<label>Children</label>

<select
required
value={formData.other_children}
onChange={(e) => setFormData(prev =>({

    ...prev, other_children: e.target.value
}))}
>



<option value= "">

    Select
</option>

<option value= "Yes">

    Yes
    
</option>

<option value= "No">

    No
</option>

</select>

</div>


<div className="application-btn-cont">
<button type="submit">Submit Application</button>
</div>

</div>

    </form>

</div>

        </div>
    )
}

