import React, { use } from "react";
import { useEffect, useState } from "react";
import { FaCity } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { Link } from "react-router-dom";


export default function SheltersCard({city}) {

    const [shelterInfo, setShelterInfo] = useState("")
    const [filteredShelters, setfilteredShelters] = useState([])


    useEffect(() =>{


        const getShelterInfo = async () =>{

            const res = await fetch(`/shelter_search?search_city=${city}`)
            const data = await res.json();

            if(res.ok){

                setfilteredShelters(data);

            }
        };

        getShelterInfo();


    }, [city])


    return(


<div className="shelters-card-container">


{filteredShelters.map((shelter) =>
<div className= "shelters-card-card" key = {shelter.id}>


<img src= {`http://localhost:5009${shelter.image_url}`}></img>


<div className="shelter-name-grp-cont-all2">

<div className="shelter-name-grp">


 <FaCity/> <h3 className="shelter-text-space-limit">{shelter.name} </h3>

</div>


<div className="shelter-city-grp">


 <HiMapPin/> <h3 className="shelter-text-space-limit"> {shelter.city} , {shelter.state}</h3>

</div>



<div className="shelter-info-grp">


 <p className="shelter-card-info-limit">{shelter.about}</p>

</div>


<div className="shelter-buttons-grp">

<Link to ={`/shelter/${shelter.id}`}> View Shelter</Link>

<Link to = {`/shelters_pets/${shelter.id}/${shelter.name}/${shelter.city}/${shelter.state}`}> View Pets</Link>

</div>



</div>
</div>
)}

</div>


    )



}