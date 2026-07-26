import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import PetCard from "../components/PetCard";
import Sidebar from "../components/Sidebar";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";



export default function SheltersPets(){

    const navigate = useNavigate();


    const {id, name, city, state} = useParams();
    console.log(id);

    return(

        <div className="shelter-pets-container">


    <Sidebar></Sidebar>


    <div className="shelter-pets-right-cont">


        <div className="shelter-pets-right-top">

            <div className="shelter-pets-right-top-space">

<button onClick={() => navigate(-1)} className="shelter-pets-back-btn"><MdArrowBack className="shelter-pets-back-icon"/> <span>Back</span></button>


   <div className="shelter-pets-city-state-top-cont">
        <h1>{name} Pets</h1>

         <div className="shelter-pets-city-state">
        
        <MdLocationOn className="shelter-pets-location-icon"></MdLocationOn>
        <p>{city}, {state}</p>

         </div>
         </div>

        </div>

       

       

<PetCard shelt_id={id} petType={"All Types"}></PetCard>

  </div>

</div>


        </div>
    )
}