import react from "react";
import Sidebar from "../components/Sidebar";
import PetCard from "../components/PetCard";
import { useState, useEffect } from "react";


export default function Pets(){

      const [petType, setPetType] = useState("All Types");
    const [shelterId, setShelterId] = useState(null);

    const [shelters, setShelters] = useState([]);



    useEffect(() =>{


        const getShelters = async () =>{


            const res = await fetch('/get_shelters');

            if(!res.ok){
                console.log("An error occurred with the response object.");
                return
            }

            const data = await res.json();

            setShelters(data);
        };

        getShelters();
    },[]);


    return(


        <div className="dashboard-main">
<Sidebar/>


<div className="dashboard-right">


    <div className="dashboard-right-wrapper2">


    <div className="dashboard-top-inside">
<h1>Featured Pets</h1>
<p>Browse pets currently available for adoption.</p>
</div>



<div className="dashboard-top">

<div className="dashboard-select">
<select
name="pet_type"
value={petType}
onChange={(e) => setPetType(e.target.value)}
>
<option 
value="All Types">All Types</option>
<option
value= "Dog">Dog</option>
<option value= "Cat">Cat</option>
<option value= "Other">Other</option>

</select>


<select
className="shelters-select-limit"
name="shelter_id"
value={shelterId ?? ""}
onChange={ (e) =>{

const value = e.target.value;
setShelterId(value === "" ? null: Number(value))

}
    
}>

    
    <option
    value= "">All Shelters</option>

    {shelters.map((shelt) =>(

  

    <option
    value={shelt.id}
    key={shelt.id}
    
    >
{shelt.name}
    </option>


  ))}



</select>

</div>


    <PetCard petType = {petType} shelt_id = {shelterId}></PetCard>

    </div>


    </div>

</div>


</div>


    )




}