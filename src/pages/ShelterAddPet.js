import React from "react";
import { useState } from "react";
import { getUser } from "../components/Auth";

import Sidebar from "../components/Sidebar";



export default function ShelterAddPet (){


    const person = getUser();
    const user_id = person?.userId;

    const [formData, setFormData] = useState({
 name: "",
    type: "",
    breed: "",
    age: "",
    city: "",
    state: "",
    status: "",
    energy_level: "",
    temperament: "",
    attention_needs: "",
    size: "",
    good_with_kids: "",
    good_with_pets: "",
    training_status: "",
    maintenance_level: "",
    home_type: "",
    description: "",
    image_url: "",
    created_at: "",
    shelter_id: "",
    shelter_name: "",
    image_file: null

    });



    const [image_File, set_Image_File] = useState(null);

    const [image_Preview, set_Image_Preview] = useState(null);






   

const handleImageChange =(e) =>{

    const file = e.target.files[0];

    if(file){

        set_Image_File(file);
        setFormData((prev) =>({...prev, image_file: e.target.files[0]}));
        set_Image_Preview(URL.createObjectURL(file));
    }
}




    const handleAddPet = async (e) =>{

        e.preventDefault()


        if(!user_id){

            console.log("No user id was detected.")
            return
        }

        const data = new FormData();


        data.append("user_id", user_id);
        data.append("name", formData.name);
        data.append("type", formData.type);
        data.append("breed", formData.breed);
        data.append("age", formData.age);
        data.append("city", formData.city);
        data.append("state", formData.state);
        data.append("status", "Available");
        data.append("energy_level", formData.energy_level);
        data.append("temperament", formData.temperament);
        data.append("attention_needs", formData.attention_needs);
        data.append("size", formData.size);
        data.append("good_with_kids", formData.good_with_kids);
        data.append("good_with_pets", formData.good_with_pets);
        data.append("training_status", formData.training_status);
        data.append("maintenance_level", formData.maintenance_level);
        data.append("home_type", formData.home_type);
        data.append("description", formData.description);
        data.append("image_file", formData.image_file);


        const res = await fetch('/shelter_add_pet',{

            method: "POST",
            body: data
        });


        if(!res.ok){

            console.log("an error occured with the response object");
            return
        }






    }


    

    return(

        <div className="shelter-add-pets-main">

            <Sidebar></Sidebar>


             <div className="shelter-add-pets-right">




<div className="shelter-add-pets-right-top-grid-sep">

<div className="shelter-add-pets-right-top">
                <h1>Add Pet Listing </h1>
                <p>Add pet information, photos, and details for adoption.</p>
                </div>



                  <form className="shelter-add-pets-right-grid" onSubmit={handleAddPet}>


                        <div className="shelter-add-pets-right-grid-row-1">


                            <div className="shelter-add-pets-right-grid-row-1-top-space">


                              <div className="shelter-add-pets-right-grid-row-1-top">


                                {image_Preview ?(


<img src={image_Preview} className="complete-profile-shelter-img"></img>):(


                      <img src="/images/paw-print-default-img.jpg" className="complete-profile-shelter-img"></img>)

                                }

                <input
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleImageChange

               }></input>

                </div>


<div className="shelter-add-pets-right-grid-row-1-label-top">

<label>Name</label>

<input 
type="text"
value={formData.name}
onChange={(e) =>setFormData((prev) =>({...prev, name: e.target.value}))}
required></input>

</div>

</div>


</div>



    <div className="shelter-add-pets-right-grid-row-2">



<h2>Basic Information</h2>


<div className="shelter-add-pets-right-grid-row-2-label-sep-space">
<div className="shelter-add-pets-right-grid-row-2-label-sep">

<div className="shelter-add-pets-right-grid-row-2-label">


                      <label>Type</label>

                <input
                required
                type="text"
                value={formData.type}
                onChange={(e) => setFormData((prev) => ({...prev, type: e.target.value

                }))}></input>

                </div>


<div className="shelter-add-pets-right-grid-row-2-label">

<label>Age</label>

<input 
required
type="text"
value={formData.age}
onChange={(e) =>setFormData((prev) =>({...prev, age: e.target.value}))}></input>

</div>


</div>







<div className="shelter-add-pets-right-grid-row-2-label-sep">

<div className="shelter-add-pets-right-grid-row-2-label">


<label>Breed</label>

<input 
required
type="text"
value={formData.breed}
onChange={(e) =>setFormData((prev) =>({...prev, breed: e.target.value}))}></input>

</div>


<div className="shelter-add-pets-right-grid-row-2-label">

<label>Size</label>

<input 
required
type="text"
value={formData.size}
onChange={(e) =>setFormData((prev) =>({...prev, size: e.target.value}))}></input>
</div>



</div>



</div>


</div>




    <div className="shelter-add-pets-right-grid-row-3">



<h2>Behavior and Traits</h2>



<div className="shelter-add-pets-right-grid-row-2-label-sep-space-last">

<div className="shelter-add-pets-right-grid-row-2-label-sep-space">

<div className="shelter-add-pets-right-grid-row-2-label-sep">

<div className="shelter-add-pets-right-grid-row-2-label">

                      <label>Energy Level</label>

                <input
                required
                type="text"
                value={formData.energy_level}
                onChange={(e) => setFormData((prev) => ({...prev, energy_level: e.target.value

                }))}></input>


                </div>


<div className="shelter-add-pets-right-grid-row-2-label">


<label>Attention Needs</label>

<input 
required
type="text"
value={formData.attention_needs}
onChange={(e) =>setFormData((prev) =>({...prev, attention_needs: e.target.value}))}></input>


</div>




</div>





<div className="shelter-add-pets-right-grid-row-2-label-sep">



<div className="shelter-add-pets-right-grid-row-2-label">

<label>Temperamant</label>

<input 
required
type="text"
value={formData.temperament}
onChange={(e) =>setFormData((prev) =>({...prev, temperament: e.target.value}))}></input>

</div>



<div className="shelter-add-pets-right-grid-row-2-label">


<label>Maintainance Level</label>

<input 
type="text"
value={formData.maintenance_level}
onChange={(e) =>setFormData((prev) =>({...prev, maintenance_level: e.target.value}))}></input>


</div>



</div>




</div>


<div className="shelter-add-pets-right-grid-row-2-label-last">


<label>Training Status</label>

<input 
type="text"
value={formData.training_status}
onChange={(e) =>setFormData((prev) =>({...prev, training_status: e.target.value}))}></input>


</div>



</div>

</div>





<div className="shelter-add-pets-right-grid-row-4">



<h2>Adoption Compatibility</h2>


<div className="shelter-add-pets-right-grid-row-2-label-sep-space-last">

<div className="shelter-add-pets-right-grid-row-2-label-sep-space">


<div className="shelter-add-pets-right-grid-row-2-label">

                      <label>Good With Kids</label>

                <input
                type="text"
                value={formData.good_with_kids}
                onChange={(e) => setFormData((prev) => ({...prev, good_with_kids: e.target.value

                }))}></input>

                </div>


<div className="shelter-add-pets-right-grid-row-2-label">


<label>Good With Pets</label>

<input 
type="text"
value={formData.good_with_pets}
onChange={(e) =>setFormData((prev) =>({...prev, good_with_pets: e.target.value}))}></input>



</div>

</div>




<div className="shelter-add-pets-right-grid-row-2-label">


<label>Home Type</label>

<input 
type="text"
value={formData.home_type}
onChange={(e) =>setFormData((prev) =>({...prev, home_type: e.target.value}))}></input>


</div>

</div>


</div>



<div className="shelter-add-pets-right-grid-row-5">



<h2>Description</h2>

                      

                <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({...prev, description: e.target.value

                }))} className="shelter-add-pets-textarea"></textarea>


</div>



<div className="shelter-add-pets-right-grid-row-6">


<button type = "submit" className="shelter-add-pets-btn">Add Pet</button>





</div>




</form>

</div>



</div>


                  </div>


            )


}