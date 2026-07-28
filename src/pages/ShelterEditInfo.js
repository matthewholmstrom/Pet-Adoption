import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getUser } from "../components/Auth";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Toast from "../components/Toast";



export default function ShelterEditInfo (){

    const person = getUser();
    const user_id = person?.userId;


    const [imagePreview, setImagePreview] = useState(null);

    const[toast, setToast] = useState(null);
    const [shelter_info, setShelter_Info] = useState({});


    
    useEffect(() =>{

        const getShelter = async ()=>{


            const res = await fetch(`/shelter_info/${user_id}`);

             if(!res.ok){

                console.log("error: in the response from /shelter_info ");
                return
            }
            const data = await res.json();

            setShelter_Info(data);

        }

        getShelter();
    }, [user_id])




    const updateShelter = async (e) =>{


        e.preventDefault();

        const formData = new FormData();

        formData.append("name", shelter_info.name);
formData.append("address", shelter_info.address);
formData.append("city", shelter_info.city);
formData.append("state", shelter_info.state);
formData.append("zip", shelter_info.zip);
formData.append("about", shelter_info.about);
formData.append("phone", shelter_info.phone);
formData.append("website", shelter_info.website);
formData.append("mission", shelter_info.mission);
formData.append("hours", shelter_info.hours);
formData.append("user_id", user_id);

if(shelter_info.image_file){

    formData.append("image_file", shelter_info.image_file);
}

const res = await fetch('/edit_shelter_info', {

    method: "PUT",
    body: formData
});

   if(!res.ok){

                console.log("Error in the response object");
                 setToast({type: "error",
                    message: "Could not update the shelter's information."
                });

                return
            }
            const data = await res.json();

               setToast({type: "success",
                    message: "Shelter's information was successfully updated."
                });


            
            

    }


    const handleImageChange = (e) =>{

        e.preventDefault();

        const file = e.target.files[0];

        if(file){


            setShelter_Info((prev) =>({...prev, image_file: file}))
            setImagePreview(URL.createObjectURL(file));
            
        };


    }

    return (

        <div className="set-shelter-info-main">

            
                        {toast && (
            
                            <Toast toast={toast} closeToast={() => setToast(null)}></Toast>
                        )}
            
                    


<Sidebar></Sidebar>


<div className="set-shelter-info-right">



    <div className="set-shelter-info-right-space-for-all">



            <div className="set-shelter-info-stuff-top-cont">




<div>
            <h1>Edit Shelter Profile</h1>
            <p>Update your shelter information and details.</p>

            </div>

            </div>



    <form className="set-shelter-info-grid" onSubmit={updateShelter}>



        
        <div className="set-shelter-info-row2">


            <div className="set-shelter-info-row2-top-cont">


            <div className="set-shelter-info-row2-top">


                {imagePreview?( <img src={imagePreview} className="set-shelter-info-picture"></img>):(


            <img src={shelter_info.image_url} className="set-shelter-info-picture"></img>

                )}


        <input
        type="file" accept=".pdf,.jpg,.jpeg"
        onChange={handleImageChange}


        ></input>

        </div>


        <div className="set-shelter-info-row2-right-container">


            <label htmlFor="name">
                Name
            </label>

            <input
            required
            type="text"
            value={shelter_info.name || ""}
            onChange={(e) => setShelter_Info((prev) =>({...prev, name: e.target.value}))}></input>
        </div>

        </div>


            
        </div>


        
        <div className="set-shelter-info-row3">

            <h2>Basic Information</h2>


<div className="set-shelter-info-row3-cont-outside">


<div className="set-shelter-info-row3-cont-all">

              <label htmlFor="phone">
                Phone     
            </label>

            <input
            required
            type="text"
            value={shelter_info.phone || ""}
            onChange={(e) => setShelter_Info((prev) =>({...prev, phone: e.target.value}))}></input>

            </div>
        

<div className="set-shelter-info-row3-cont-all">


        <label htmlFor="website">
Website
        </label>


        <input
        required
        type="text"
        value={shelter_info.website || ""}
        onChange={(e) => setShelter_Info((prev) =>({...prev, website: e.target.value}))}></input>

</div>


</div>


</div>

            



        
        <div className="set-shelter-info-row4">


            <h2>Location</h2>


<div className="set-shelter-info-row3-cont-outside">

<div className="set-shelter-info-row3-cont-all">

<label htmlFor="address">Address</label>


<input
required
type="text"
value={shelter_info.address || ""}
onChange={(e) => setShelter_Info((prev) => ({
    ...prev, address: e.target.value
}))}></input>

</div>


<div className="set-shelter-info-row3-cont-all">
<label htmlFor="city">City</label>


<input
required
type="text"
value={shelter_info.city || ""}
onChange={(e) => setShelter_Info((prev) => ({
    ...prev, city: e.target.value
}))}></input>

</div>

</div>



<div className="set-shelter-info-row3-cont-outside">

<div className="set-shelter-info-row3-cont-all">


<label htmlFor="state">State</label>


<input
type="text"
value={shelter_info.state || ""}
onChange={(e) => setShelter_Info((prev) => ({
    ...prev, state: e.target.value
}))}></input>

</div>


<div className="set-shelter-info-row3-cont-all">


<label htmlFor="zip">Zip</label>


<input
type="text"
value={shelter_info.zip || ""}
onChange={(e) => setShelter_Info((prev) => ({
    ...prev, zip: e.target.value
}))}></input>




</div>


</div>

            
        </div>



        
        <div className="set-shelter-info-row5">



<h2>About & Mission</h2>



<div className="set-shelter-info-row3-cont-col">

<div className="set-shelter-info-row3-cont-all">

<label htmlFor="about">About</label>


<textarea
value={shelter_info.about || ""}
onChange={(e) => setShelter_Info((prev) => ({
    ...prev, about: e.target.value
}))}></textarea>

</div>



<div className="set-shelter-info-row3-cont-all">

<label htmlFor="mission">Mission</label>


<textarea
value={shelter_info.mission || ""}
onChange={(e) => setShelter_Info((prev) => ({
    ...prev, mission: e.target.value
}))}></textarea>

</div>

</div>

            
        </div>



        
        <div className="set-shelter-info-row6">


            <h2>Operating Info</h2>


<div className="set-shelter-info-row3-cont-all">


            <label htmlFor="hours">Hours</label>


<input
type="text"
value={shelter_info.hours || ""}
onChange={(e) => setShelter_Info((prev) => ({
    ...prev, hours: e.target.value
}))}></input>

</div>
        
            
        </div>


           <div className="set-shelter-info-row7">

            <button type="submit">Save Changes</button>


</div>



</form>


</div>


    </div>

    
</div>






    )

}