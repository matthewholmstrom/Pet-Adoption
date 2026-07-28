import React from "react";

import { useState, useEffect } from "react";
import { getUser } from "../components/Auth";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";


export default function AdopterApplicationsInbox (){

    const person = getUser();

    const user_id = person.userId;

    const [toast, setToast] = useState(null);

    const [applications, setApplications] = useState([]);

    const[searchPet, setSearchPet] = useState("");

    const [searchShelter, setSearchShelter] = useState("All Shelters");

        const [searchPetType, setSearchPetType] = useState("All Types");
        const [shelters, setShelters] = useState([]);


        let filtered_apps = [];



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



    useEffect(() =>{

        if(!user_id){
            console.log("User ID is undefined.");
            return
        }


        const getApplications = async () =>{

            const res = await fetch(`/user_applications/${user_id}`,);

            const data = await res.json();

            if(!res.ok){

                console.log("An error occured in the response.")
            }

            if(Array.isArray(data)){

            setApplications(data);

            console.log(data);

            }
        };

        getApplications();

    }, [user_id]);

     

    const handleDelete = async (id) =>{

        const res = await fetch(`/user_applications/${id}`,


           {method: "DELETE"


           }

        );

        if(!res.ok){

            console.log("Error in the response.");
            setToast({type: "error",
                                    message: "There was an error in deleting the application."
            })
        
            return
        }

        const data = await res.json();
         setApplications((prev) => prev.filter(app => app.id !==id));

        
           
    }
  


  const formatted_date = (date) =>{

        const new_date = new Date(date).toLocaleDateString([],

            {

                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );
        return new_date;
    }



    filtered_apps = applications.filter((app) =>(

            app.pet_name.toLowerCase().includes(searchPet.toLowerCase())

    ));


    if(searchPetType === "Other"){

        filtered_apps = filtered_apps.filter((app) =>(

            app.pet_type !== "Dog" && app.pet_type !== "Cat"

        ))
    }else if(searchPetType !== "All Types"){


        filtered_apps = filtered_apps.filter((app) =>(

            app.pet_type === searchPetType
        ))
    };


    if(searchShelter!== "All Shelters"){

        filtered_apps = filtered_apps.filter((app) =>(


            app.shelter_name === searchShelter

        ))
    }


    return(

        <div className="adopters-applications-main">


            {toast &&(

<Toast toast = {toast} closeToast={() => setToast(null)}></Toast>

            )}

<Sidebar></Sidebar>


            <div className="adopters-applications-right">

                

                <div className="adopters-table-wrapper">


<div className="adopters-table-wrapper-inside">

                     <h1>My Applications</h1>
                     <p>Track your adoption applications and their status.</p>
                     </div>


                        <div className="adopters-selects-wrapper-sep">


<div className="adopters-selects-wrapper">

<input
                        type="text"
                        value = {searchPet}
                        onChange={(e) => setSearchPet(e.target.value)}
                        className="adopters-application-input"
                        placeholder="Search Pets..."></input>



                         <select
                    
                    name= "searchPetType"
                    value={searchPetType}
                    onChange={(e) => setSearchPetType(e.target.value)}>



                        <option value= "All Types">
                            All Types
                        </option>


                        <option value= "Dog">
                            Dog
                        </option>

                        <option value= "Cat">
                            Cat
                        </option>

                        <option value= "Other">
                            Other
                        </option>


                    </select>




 <select
                    
                    name= "searchShelter"
                    value={searchShelter}
                    onChange={(e) => setSearchShelter(e.target.value)}
                     className="shelters-select-limit">


                        <option value= "All Shelters">
                            All Shelters
                        </option>

{shelters.map((shelt) => (


                        <option value= {shelt.name}
                        key={shelt.id}>
                            {shelt.name}
                        </option>


))}

        

                    </select>


                    </div>


                <table className="adopters-applications-table">


                    

                    <thead>

                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Shelter</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Action</th>
                        
                        </tr>

                        </thead>

                        <tbody>

{filtered_apps.map((app) =>(


<tr key={app.id}>


<td><img src= {app.pet_image} className="adopter_application-img"></img></td>
                            <td>{app.pet_name}</td>
                            <td>{app.shelter_name}</td>
                            <td>{formatted_date(app.created_at)}</td>
                            <td>{app.status}</td>
                            {app.status !== "rejected"?
                            
                            <td> <button className="adopter-application-cancel-button" onClick={() => handleDelete(app.id)}>Cancel Application</button></td>:
                            <td>--</td>
                         }



</tr>



))}


</tbody>

                </table>


                </div>





                </div>
            </div>

        </div>
    )
}