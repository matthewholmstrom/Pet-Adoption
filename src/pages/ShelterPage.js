import React from "react";
import { useEffect, useState } from "react";
import { FaCompass } from "react-icons/fa";
import SheltersCard from "../components/SheltersCard";
import Sidebar from "../components/Sidebar";


export default function SheltersPage() {


    const [shelterSearch, setShelterSearch] = useState("")
    const [shelt_city, set_shelt_City] = useState("")

    
    const sendCity = ()=>{

set_shelt_City(shelterSearch);

    }

    return(

        
        
        <div className="shelter-page-main">

            <Sidebar></Sidebar>


<div className="shelter-page-right">

    <div className="shelter-page-top-inside">
            <h1 className="h1-shelter-page-align"><FaCompass/> Find Shelters</h1>
            <p>Search by city or ZIP code to discover animal shelters near you </p>
            </div>

        <div className="shelter-page-top">

<div className="shelter-search-container">

<input
type="text"
placeholder="Enter city or ZIP (e.g. Boise or 83702)"
value={shelterSearch}
onChange={(e) => setShelterSearch(e.target.value)}
></input>

<button onClick={sendCity}>Search</button>


<button onClick={() =>{set_shelt_City("");
    setShelterSearch("");
}}>Show All</button>


</div>

            

            <div className="shelters-page-all-shelters-cont">

            
            <SheltersCard city = {shelt_city}/>
            </div>
            </div>


</div>

        </div>
        
    )







}