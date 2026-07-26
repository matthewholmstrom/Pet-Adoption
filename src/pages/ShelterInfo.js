import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../components/Auth";



export default function ShelterInfo(){

    const person = getUser();

    const user_id = person?.userId;
    const user_role = person?.role;



    const {id} = useParams();
    const [shelter, setShelter] = useState([]);

    useEffect(() =>{


        const fetch_shelter = async () =>{

            
        try{


            const res = await fetch(`/shelters/${id}`);
            const data = await res.json();
            console.log(data);


            if(res.ok){

                setShelter(data);
            }

        }catch(err){
 console.log("error:", err);

        }


        };

        fetch_shelter();
    }, [id]
)


    return(

        <div className="shelter_details_main">


<Sidebar></Sidebar>


        <div className="shelter_details_right">

               <div className="shelter_details_right-wrapper">



        <div className="shelter_details_left-col">
                     
        <div className="shelter_details_left-img-cont">


            
<img src= {`http://localhost:5009${shelter.image_url}`}></img>
            </div>




<div className="shelter_details_left-anchor-cont">


    {(!user_id ?(


<div className="shelter_details_left-anchor-cont-links">
  
<Link to= {`/login`}>Must Login to Contact Shelter</Link>

            
<Link to= {`/shelters_pets/${shelter.id}/${encodeURIComponent(shelter.name)}/${encodeURIComponent(shelter.city)}/${encodeURIComponent(shelter.state)}`}> View Pets</Link>

</div> ): user_role === "shelter"?(



<div className="shelter_details_left-anchor-cont-links">
  
<button disabled>Must be an Adopter to Contact Shelter</button>


<Link to= {`/shelters_pets/${shelter.id}/${encodeURIComponent(shelter.name)}/${encodeURIComponent(shelter.city)}/${encodeURIComponent(shelter.state)}`}> View Pets</Link>

</div>

):

(
<div className="shelter_details_left-anchor-cont-links">

            
<Link to= {`/contact_shelter/${shelter.id}?shelt_name=${encodeURIComponent(shelter.name)}`}>Contact Shelter</Link>

            
<Link to= {`/shelters_pets/${shelter.id}/${encodeURIComponent(shelter.name)}/${encodeURIComponent(shelter.city)}/${encodeURIComponent(shelter.state)}`}> View Pets</Link>

            </div>
))}

            </div>


            </div>

         
        <div className="shelter_details_right-col">



            <div className="shelter_details_right-col-top"> 


                <h1>{shelter.name}</h1>
                <p>{shelter.city} {shelter.state}</p>  
                  <p>{shelter.address}</p>  



            </div>


            <div className="shelter_details_right-col-row2-1"> 

                <h3>Email</h3>  
                  {shelter.email? <p>{shelter.email}</p>: <p>N/A</p>} 


                
            </div>



            
            <div className="shelter_details_right-col-row2-2"> 

                
                <h3>City</h3>  
                  <p>{shelter.city}</p>  
  


                
            </div>




            
            <div className="shelter_details_right-col-row3-1"> 

                
                <h3>State</h3>  
                  <p>{shelter.state}</p>  
 


                
            </div>



            
            <div className="shelter_details_right-col-row3-2"> 

                
                <h3>Zip</h3>  
                  <p>{shelter.zip}</p>  


                
            </div>


            
            <div className="shelter_details_right-col-bottom"> 

               
                <h3>About</h3>  
                  <p>{shelter.about}</p>  


            </div>



            </div>

            </div>

            </div>



        </div>

        

    )
}