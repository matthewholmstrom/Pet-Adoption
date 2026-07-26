import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function PetCard({petType, shelt_id}){

    const [petSample, setPetSample] = useState([])


console.log(shelt_id);
    useEffect(() =>{

        

        const fetchPets = async () =>{

            try{


            const url = shelt_id ? `/pets?s_id=${shelt_id}`: '/pets';

            const res = await fetch(url)
            const data = await res.json();
            console.log(data);
           
            if(res.ok)
                {
                    const filtered_pets = petType === "All Types" ?
                    data : petType === "Other" ? 

                    data.filter((pet) => pet.type !== "Dog" && pet.type !== "Cat"):

                    data.filter((pet) => pet.type === petType);

                    const filtered_location = shelt_id === null?
                    filtered_pets :
                    filtered_pets.filter((pet) => pet.shelter_id === Number(shelt_id));

                    setPetSample(filtered_location);

                }

        }catch(err){
            console.log("error: ", err)
        }

    }; 
    fetchPets()

    }, [petType, shelt_id])


    return (

        <div className="pet-sample-container">



{petSample.map((pet) =>(
            <div className="pet-card-sample" key={pet.id}>

            <img src= {`http://localhost:5009${pet.image_url}`}>
            </img>
            

            <div className="pet-card-sample-cont">
            
            
            <div className="pet-card-sample-cont-top">
                        
                        <p className="pet-card-sample-cont-top-p-span"><span>Type:</span> <span className="pet-card-space-limit">{pet.type}</span></p>
            
                        <p className="pet-card-sample-cont-top-p-span"><span>Breed:</span> <span className="pet-card-space-limit"> {pet.breed}</span>
            
            </p>
            
                    <p className="pet-card-sample-cont-top-p-span"> <span>Age:</span> <span className="pet-card-space-limit">{pet.age}</span></p>
            <p className="pet-card-sample-cont-top-p-span"><span>Shelter:</span> <span className="pet-card-space-limit">{pet.shelter_name}</span></p>
            
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