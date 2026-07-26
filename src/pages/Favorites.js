import React from "react";
import { useEffect, useState } from "react";
import { getUser } from "../components/Auth";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";


export default function Favorites (){


    const [favorites, setFavorites] = useState([]);
    const user = getUser();
    const [searchName, setSearchName] = useState("");
    const [petType, setPetType] = useState("All Types");
    const [shelter, setShelter] = useState("All Shelters");

    const [filteredPets, setFilteredPets] = useState([]);


     const [shelters, setShelters] = useState([])



    const user_id = user.userId;
    console.log("this is user id:", user_id);






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
            return
        }

        const getFavorites = async () =>{


            const res = await fetch(`/users_favorites/${user_id}`);
            const data = await res.json();

            if(!res.ok){

                console.log("error: in the response from /get_favorites ");
                return
            }

            setFavorites(data);



        };

        getFavorites();

    },[user_id]);


    let filtered_pets = searchName ? favorites.filter((fav) =>(
    
         fav.pet_name.toLowerCase().includes(searchName.toLowerCase())
    )
    ): favorites



   

    filtered_pets = petType === "All Types" || petType==="Other"? filtered_pets: filtered_pets.filter((fav) =>(

        fav.pet_type.toLowerCase() ===  petType.toLowerCase()
    ));

    filtered_pets = shelter === "All Shelters"? filtered_pets:

    filtered_pets.filter((fav) =>(

        fav.shelter_name === shelter
    ));


    if(petType === "Other"){

        filtered_pets = filtered_pets.filter((fav) =>(


            fav.pet_type.toLowerCase() !== "cat" && fav.pet_type.toLowerCase() !== "dog"
        ))
    };



    const deleteFavorite = async (id) =>{

        if(!id){
            console.log("no id passed to the delete favorite function.");
        };

        const res = await fetch(`/favorites/${id}`,
            {

                method: "DELETE"
            }
        );

        const data = await res.json();
        
        if(!res.ok){

            console.log("error in the response from delete favorite");
            return
        }

        console.log(data);


    }


  


    return(


        <div className="favorites-main-cont">

            <Sidebar></Sidebar>



            <div className="favorites-right-cont">



<div className="favorites-right-wrapper">



                <div className="favorites-right-top-inner-cont">
                    <h1>My Favorites</h1>
                    <p>View your favorite pets.</p>
                    </div>



<div className="favorites-right-top-space">

                    <div className="favorites-right-search-stuff">

                    <input
                    type="text"
                    placeholder="Seach Pets..."
                    value={searchName}
                    name="searchName"
                    onChange={(e) => setSearchName(e.target.value)}></input>


                    <select
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    className="pet-favorite-select">
                        <option
                        value= "All Types">All Types
                        </option>
                        
                        <option
                        value= "Dog">Dog
                        </option>

                          <option
                        value= "Cat">Cat
                        </option>
           
                          <option
                        value= "Other">Other
                        </option>

                    </select>

                    <select
                    
                    value={shelter}
                    onChange={(e) => setShelter(e.target.value)}
                                            className="shelters-select-limit"
>


                        <option
                        value= "All Shelters">All Shelters
                        </option>



                        {shelters.map((shelt) =>(
                        
                        <option
                        key={shelt.id}
                        value= {shelt.name}>{shelt.name}
                        </option>

))}


                    </select>
                    </div>

                



                 <table className="favorites-table">

                    <thead>

                        <tr>

                            
                            <th>Photo</th>

                            <th>Name</th>
                             <th>Type</th>

                            <th>Breed</th>

                            <th>Age</th>

                            <th>Shelter</th>

                            <th>Action</th>

                            <th>Action</th>



                        </tr>


                    </thead>

                    <tbody>

                        {filtered_pets.map((fav) =>{


                         return   (<tr key={fav.favorite_id}>

                            <td> <img className="fave-pet-img" src= {`http://localhost:5009${fav.pet_image}`}>
            </img>
                   </td>



             <td>{fav.pet_name}</td>
                                                                <td>{fav.pet_type}</td>

                                <td>{fav.pet_breed}</td>

                                <td>{fav.pet_age}</td>

                                <td>{fav.shelter_name}</td>

                                
    

                                        <td><Link to={`/pet/${fav.pet_id}`} className="favorites-application-moreinfo-button">More Info</Link> </td>

                                      <td><button className="favorites-application-cancel-button" onClick={() => deleteFavorite(fav.favorite_id)}> Remove</button></td>

                            </tr>)
                        })}

                    </tbody>
                 </table>

                 


                  </div>

                  </div>


                

            </div>
        </div>
    )
}