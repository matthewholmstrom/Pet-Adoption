import React from "react";
import { useState,useEffect } from "react";

import { getUser } from "../components/Auth";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";



export default function SheltersEditPet(){

    const [pet_info,setPet_Info] = useState({});

    const [imagePreview, setImagePreview] = useState(null);


    const {pet_id} = useParams();


    useEffect(() =>{


        const getPet = async () =>{

        const res = await fetch(`/pet_info/${pet_id}`)


        const data = await res.json();

        if(!res.ok){

            console.log("An error occured with the response from pet info");
            return
        }

        setPet_Info(data);

        };

        getPet();


    }, [pet_id]);


    const handleEdit = async (e) =>{

        e.preventDefault();

        const formData = new FormData();

        formData.append("id", pet_id);

        formData.append("name", pet_info.name);
        formData.append("type", pet_info.type);
        formData.append("breed", pet_info.breed);
        formData.append("age", pet_info.age);
        formData.append("size", pet_info.size);

        formData.append("energy_level", pet_info.energy_level);
        formData.append("temperament", pet_info.temperament);
        formData.append("attention_needs", pet_info.attention_needs);
        formData.append("maintenance_level", pet_info.maintenance_level);
        formData.append("training_status", pet_info.training_status);

        formData.append("good_with_kids", pet_info.good_with_kids);
        formData.append("good_with_pets", pet_info.good_with_pets);
        formData.append("home_type", pet_info.home_type);

        formData.append("description", pet_info.description);
        formData.append("image_file", pet_info.image_file);

        const res = await fetch('/pets', {


            method: "PUT",
        
            body: formData
        });

        const data = await res.json();

          if(!res.ok){

                console.log("An error occured in the pet edit response");
                return
            };

    }



    const handleImageFile =(e) =>{


        const file = e.target.files[0];

        if(file){

            setImagePreview(URL.createObjectURL(file));
            setPet_Info((prev) =>({...prev, image_file: file}));
        }

    }



    return(


        <div className="shelters-edit-pet-main">

            <Sidebar/>


 <div className="shelters-edit-pet-right">



    <div className="shelter-edit-pet-right-column">




<div className="shelters-edit-pet-top-linkh2-space">
<Link to={"/shelter_manage_pets"} className="shelter-manage-pets-back">
< MdArrowBack className="shelter-edit-back-btn-icon"/>Back
</Link>


<div className="shelters-edit-pet-right-link-h1-space">
<h1>Edit Pet Profile</h1>
<p>Update your pet's information and details.</p>
</div>

</div>






<form className="shelters-edit-pet-top" onSubmit={handleEdit}>


<div className="shelters-edit-pet-cards">


    
<div className="shelters-edit-pet-profile-card">

    <div className="shelters-edit-pet-profile-card-img-space">



{imagePreview ?(

  <img src= {imagePreview} className="shelters-edit-pet-img"></img>

):(


    <img src= {pet_info.image_url} className="shelters-edit-pet-img"></img>

)}





    <input type="file" accept=".pdf,.jpg,.jpeg"
    
    onChange={handleImageFile}></input>

    </div>

<div className="shelters-edit-pet-profile-second-input-space">

<label htmlFor="name">
    Name
</label>

    <input type="text"
    required
    value={pet_info.name || ""}
    
    onChange={(e) => setPet_Info((prev) => ({...prev, name: e.target.value}))}
    
    id ="name">


    </input>

    </div>

</div>





<div className="shelters-edit-pet-basic-card">


    <h2>Basic Information</h2>



<div className="shelters-edit-pet-basic-card-middle-stuff">


    <div className="shelters-edit-pet-basic-card-middle-stuff-row">

        <div className="shelters-edit-pet-container-basic">
    <label>Type</label>

    <input

        required
    value={pet_info.type|| ""}
    name="type"
    onChange={(e) => setPet_Info({...pet_info, type: e.target.value})}></input>
    </div>


<div className="shelters-edit-pet-container-basic">
    <label>Breed</label>

    <input value={pet_info.breed|| ""}
    name="breed"
    required

    onChange={(e) => setPet_Info({...pet_info, breed: e.target.value})}></input>

    </div>

    </div>


<div className="shelters-edit-pet-basic-card-middle-stuff-row">

    <div className="shelters-edit-pet-container-basic">

     <label>Age</label>

    <input
       required

    value={pet_info.age|| ""}
    name="age"
    onChange={(e) => setPet_Info({...pet_info, age: e.target.value})}></input>

    </div>


 <div className="shelters-edit-pet-container-basic">
    <label>Size</label>

    <input value={pet_info.size|| ""}
        required

    name="size"
    onChange={(e) => setPet_Info({...pet_info, size: e.target.value})}></input>

    </div>


    </div>


</div>
</div>






<div className="shelters-edit-pet-behavior-card">


    <h2>Behavior and Traits</h2>



    
<div className="shelters-edit-pet-basic-card-middle-stuff">



<div className="shelters-edit-pet-basic-card-middle-stuff-row">


    <div className="shelters-edit-pet-container-basic">
    <label>Energy Level</label>

    <input
    value={pet_info.energy_level|| ""}
    name="energy_level"
    onChange={(e) => setPet_Info({...pet_info, energy_level: e.target.value})}></input>

    </div>


<div className="shelters-edit-pet-container-basic">

    <label>Temperament</label>

    <input value={pet_info.temperament|| ""}
    name="temperament"
    onChange={(e) => setPet_Info({...pet_info, temperament: e.target.value})}></input>

    </div>


    </div>



<div className="shelters-edit-pet-basic-card-middle-stuff-row">


    <div className="shelters-edit-pet-container-basic">

     <label>Attention Needs</label>

    <input
   
    value={pet_info.attention_needs|| ""}
    name="attention_needs"
    onChange={(e) => setPet_Info({...pet_info, attention_needs: e.target.value})}></input>

</div>


  <div className="shelters-edit-pet-container-basic">
    <label>Maintainance Level</label>

    <input value={pet_info.maintenance_level|| ""}
    name="size"
    onChange={(e) => setPet_Info({...pet_info, maintenance_level: e.target.value})}></input>

    </div>


    </div>

<div className="shelters-edit-pet-container-basic">
     <label>Training Status</label>

    <input value={pet_info.training_status|| ""}
    name="training_status"
    onChange={(e) => setPet_Info({...pet_info, training_status: e.target.value})}></input>

    </div>

    </div>


</div>




<div className="shelters-edit-pet-compatibility-card">


    <h2>Adoption Compatibility</h2>

    <div className="shelters-edit-pet-basic-card-middle-stuff">



        <div className="shelters-edit-pet-basic-card-middle-stuff-row">


            <div className="shelters-edit-pet-container-basic">

    <label>Good With Kids</label>

    <input
    value={pet_info.good_with_kids|| ""}
    name="good_with_kids"
    onChange={(e) => setPet_Info({...pet_info, good_with_kids: e.target.value})}></input>

    </div>



<div className="shelters-edit-pet-container-basic">
     <label>Good With Pets</label>

    <input
   
    value={pet_info.good_with_pets|| ""}
    name="good_with_pets"
    onChange={(e) => setPet_Info({...pet_info, good_with_pets: e.target.value})}></input>

    </div>

    </div>


 <div className="shelters-edit-pet-basic-card-middle-stuff-row">

    <div className="shelters-edit-pet-container-basic">
    <label>Home Type</label>

    <input value={pet_info.home_type|| ""}
    name="home_type"
    onChange={(e) => setPet_Info({...pet_info, home_type: e.target.value})}></input>

    </div>

    </div>


    </div>


</div>







<div className="shelters-edit-pet-description-card">


    <h2>Description</h2>


    <textarea
    value={pet_info.description|| ""}
    name="description"
    onChange={(e) => setPet_Info({...pet_info, description: e.target.value})}></textarea>


</div>




</div>



<div className="shelters-edit-pet-submit-btn-cont">


<button className="shelters-edit-pet-submit-btn" type="submit">Save Changes</button>
</div>
            



</form>


        </div>


</div>

        </div>
    )

    






}