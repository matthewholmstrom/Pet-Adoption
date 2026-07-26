import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

import { getUser } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export default function CompleteShelterProfile (){

    const navigate = useNavigate();

    const person = getUser();

    const user_id = person?.userId;


     const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    about: "",
    phone: "",
    website: "",
    mission: "",
    hours: "",
    image_url: "",
    image_file: null
});


const updateShelter = async () =>{



    const data =  new FormData();

    data.append("name", formData.name);
    
    data.append("user_id", user_id);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("zip", formData.zip);
    data.append("about", formData.about);
    data.append("phone", formData.phone);
    data.append("website", formData.website);
    data.append("mission", formData.mission);
    data.append("hours", formData.hours);
    data.append("image_file", formData.image_file);


    const res = await fetch(`/complete_shelter_profile/`,{


        method: "PUT",
        body: data
    })


    if(!res.ok){

        console.log("error occured with the response object");
        return
    }

    navigate('/shelter_dashboard')


}


    return(



        <div className="complete-shelter-profile-page-main">


<Sidebar></Sidebar>





 <div className="complete-shelter-profile-page-right">





 <div className="complete-shelter-profile-page-right-grid-cont">



    <div className="complete-shelter-profile-page-right-grid-top">

    <h1>Create Your Shelter Profile</h1>
    <p>Complete your shelter information before adding pets.</p>
    </div>




 <div className="complete-shelter-profile-page-right-grid">




 <div className="complete-shelter-profile-page-right-grid-row1">



 <div className="complete-shelter-profile-page-right-row1-space">


     <div className="complete-shelter-profile-page-right-grid-row1-cont-first">


    <img src="/images/paw-print-default-img.jpg" className="complete-profile-shelter-img"></img>

<input
type="file"
accept=".pdf,.jpg,.jpeg"
onChange={(e) => setFormData((prev) => ({...prev,image_file: e.target.files[0]}))}
></input>


</div>


<div className="complete-shelter-profile-page-right-row1-space-inside">

<label>Shelter Name</label>

<input
type="text"

placeholder="Enter shelter name"
value={formData.name}
onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}></input>


</div>

</div>


</div>





 <div className="complete-shelter-profile-page-right-grid-row2">





<h2>Basic Information</h2>




 <div className="complete-shelter-profile-page-right-grid-row2-label-gap">

 <div className="complete-shelter-profile-page-right-grid-row2-label">

<label>Phone</label>

<input

type="text"
value= {formData.phone}

onChange={(e) => setFormData((prev) => ({...prev, phone: e.target.value}))}></input>

</div>


 <div className="complete-shelter-profile-page-right-grid-row2-label">
<label>Website</label>

<input

type="text"
value ={formData.website}
onChange={(e) => setFormData((prev) =>({...prev, website: e.target.value}))}></input>
</div>

</div>






 </div>

  <div className="complete-shelter-profile-page-right-grid-row3">

<h2> Location</h2>



 <div className="complete-shelter-profile-page-right-grid-row2-label-group1-sep">

 <div className="complete-shelter-profile-page-right-grid-row2-label-group1">

 <div className="complete-shelter-profile-page-right-grid-row2-label">
<label>Address</label>

<input
type="text"
value={formData.address}
onChange={(e) => setFormData((prev) =>({...prev, address: e.target.value}))}></input>


</div>



 <div className="complete-shelter-profile-page-right-grid-row2-label">
<label>State</label>

<input
type="text"
value={formData.state}
onChange={(e) => setFormData((prev) =>({...prev, state: e.target.value}))}></input>


</div>

</div>





 <div className="complete-shelter-profile-page-right-grid-row2-label-group1">
<div className="complete-shelter-profile-page-right-grid-row2-label">
<label>City</label>

<input
type="text"
value={formData.city}
onChange={(e) => setFormData((prev) =>({...prev, city: e.target.value}))}></input>

</div>



<div className="complete-shelter-profile-page-right-grid-row2-label">

<label>Zip</label>

<input
type="text"
value={formData.zip}
onChange={(e) => setFormData((prev) =>({...prev, zip: e.target.value}))}></input>

</div>


</div>

</div>




</div>





 <div className="complete-shelter-profile-page-right-grid-row3">



    <h2> About & Mission</h2>


 <div className="complete-shelter-profile-page-right-grid-row2-label-group1">

<div className="complete-shelter-profile-page-right-grid-row2-label">
    <label>About</label>

    <textarea
value={formData.about}
onChange={(e) => setFormData((prev) => ({
    ...prev, about: e.target.value
}))}></textarea>

</div>


<div className="complete-shelter-profile-page-right-grid-row2-label">


<label htmlFor="mission">Mission</label>


<textarea
value={formData.mission}
onChange={(e) => setFormData((prev) => ({
    ...prev, mission: e.target.value
}))}></textarea>


</div>


</div>



 </div>





 <div className="complete-shelter-profile-page-right-grid-row4">



    <h2>Operating Info</h2>


<div className="complete-shelter-profile-page-right-grid-row2-label">

    <label>Hours</label>


    <input
type="text"
value={formData.hours}
onChange={(e) => setFormData((prev) => ({
    ...prev, hours: e.target.value
}))}></input>

</div>




</div>



 <div className="complete-shelter-profile-page-right-grid-row5">

<button onClick={updateShelter} className="complete-shelter-profile-btn">Save Changes</button>

<Link to ={'/shelter_dashboard'} className="shelter-skip-for-now-link">

Skip for now</Link>




</div>



    </div>

</div>






 </div>





 </div>





    )



}