import React, { useEffect } from "react";

import {useState } from "react";
import { Link } from "react-router-dom";





export default function PetCardSample(){

    const [petSample, setPetSample] = useState([])

    useEffect(() =>{


        const fetchPets = async () =>{

            try{

            const res = await fetch('/pets')
            const data = await res.json();

            const new_pets = data.slice(0,4);

            if(res.ok)
                {setPetSample(new_pets);}

        }catch(err){
            console.log("error: ", err)
        }

    }; fetchPets()

    }, [])


    return (

        <div className="pet-sample-container">

{petSample.map((pet) =>(
            <div className="pet-card-sample" key={pet.id}>


            <img src= {`http://localhost:5009${pet.image_url}`}>
            </img>
            

<div className="pet-card-sample-cont">


<div className="pet-card-sample-cont-top">
            
            <p><span>Type: </span>{pet.type}</p>

            <p><span>Breed: </span>{pet.breed}

</p>

        <p><span>Age:</span> {pet.age}</p>
<p><span>Shelter:</span> {pet.shelter_name}</p>

</div>

<div className="pet-card-sample-btn-cont">


            <Link to= {`/pet/${pet.id}`}> More Info</Link>

            </div>
            

            </div>
   

     </div>
))}

        </div>
    )
}