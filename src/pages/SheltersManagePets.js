import React from "react";
import { useState,useEffect } from "react";
import { getUser } from "../components/Auth";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";



export default function SheltersManagePets(){

    const [search_pet, setSearch_Pet] = useState("");

    const [pet_type, setPet_Type] = useState("All Types");

    const [pet_status, setPet_Status] = useState("All Statuses")

    const person = getUser();

    const user_id = person.userId;


    const [pets, setPets] = useState([]);

    let filtered_pets = [];



    useEffect(() =>{


        const getPets = async () => {


            const res = await fetch(`/get_shelter_pets/${user_id}`);

            if(!res.ok){

                console.log("An error occured with the response object from get shelter pets.");
                return
            }

            const data = await res.json();
            if(Array.isArray(data)){

                setPets(data);



                
            }


        };

        getPets();
    }, [user_id]);



    const handleDelete = async (id) =>{


        const res = await fetch(`/shelters_pet_delete/${id}`,

            {
                method: "DELETE"
            }
        );

        const data = await res.json();


          if(!res.ok){

                console.log("An error occured with the response object from delete shelter pets.");
                return
            }

            setPets(prev => prev.filter((pet) => pet.id !==id));

    }


    filtered_pets = pets.filter((pet) => pet.name.toLowerCase().includes(search_pet.toLowerCase()));


    if(pet_type === "Other"){

        filtered_pets = filtered_pets.filter((pet) =>

            pet.type !== "Dog" && pet.type !== "Cat"
        
        )
    }
    else if(pet_type !== "All Types"){


        filtered_pets = filtered_pets.filter((pet) =>
        pet.type === pet_type
        
        )
    }


    if(pet_status!== "All Statuses"){


        filtered_pets = filtered_pets.filter((pet) =>

            pet.adoption_state === pet_status
        
        )
    }

    



    return(


        <div className="shelters-manage-pets-main">
            <Sidebar></Sidebar>

            <div className="shelters-manage-pets-right">''




<div className="shelters-manage-pets-right-wrapper-final">



<div className="shelters-manage-pets-right-input-space-final">


                    <div className="shelters-manage-pets-h2p-space">
                    <h1>Manage Pets</h1>
                    <p>View and manage all animals in your shelter</p>
                    </div>




<div className="shelters-manage-pets-inputs">
                    <input
                    type="text"
                    value={search_pet}
                    onChange={(e) => setSearch_Pet(e.target.value)}
                    placeholder="Search pets..."></input>

                    <select
                    value={pet_type}
                    onChange={(e) => setPet_Type(e.target.value)}>



                        <option
                        value= "All Types">All Types</option>

                        
                        <option
                        value= "Dog">Dog</option>
                        
                        <option
                        value= "Cat">Cat</option>
                        
                        <option
                        value= "Other">Other</option>
                        

                    </select>


                    <select
                    value={pet_status}
                    onChange={(e) => setPet_Status(e.target.value)}
                    >

                        <option
                        value= "All Statuses">All Statuses</option>

                        <option
                        value= "Available">Available</option>

                        
                        <option
                        value= "Pending">Pending</option>
                        
                        <option
                        value= "Not Available">Not Available</option>
                        


                    </select>
                    
                    </div>

                    </div>

                    




               





                <table className="shelters-manage-pets-table">


                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Breed</th>
                            <th>Age</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>


                    <tbody>

                        {filtered_pets && filtered_pets.map((pet)=>(

                       


                        <tr key={pet.pet_id}>
                            <td>
                                <img className ="shelters-manage-pets-img" src= {pet.pet_image}/>
                                </td>
                             <td>{pet.name}</td>
                              <td>{pet.type}</td>
                               <td>{pet.breed}</td>
                                <td>{pet.age}</td>
                                 <td>{pet.adoption_state}</td>
                                 <td><div className="shelters-manage-pets-td-space-btns"><Link  className ="shelters-manage-pets-edit-btn" to={`/shelters_edit_pet/${pet.pet_id}`}>Edit</Link> 
                                 
                                 <button className ="shelters-manage-pets-delete-btn" onClick={()=> handleDelete(pet.pet_id)}>Delete</button> </div></td>
                        </tr>


 ))}
                    </tbody>
                </table>


                </div>



</div>


          
</div>

         



        
    )
}