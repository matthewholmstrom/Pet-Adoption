import React from "react";
import { FaPaw } from "react-icons/fa";
import HowItWorks from "./HowItWorks.js";
import { useState, useEffect } from "react";
import Footer from "./Footer.js";



export default function HeroSection(){


    return (

<div className="entire-hero-container">

        <div className="hero-main">


            <div className="hero-left">


                <img src= "/images/dog_person.png"></img>

           <div className="hero-left-space"> <p>Discover. Connect. Adopt. </p> <span><FaPaw></FaPaw> <FaPaw></FaPaw> </span></div> 



            </div>


                  <div className="hero-right">


                <img src= "/images/cat_person.png"></img>


                <div className="hero-right-cont-inside">

                    <div className="hero-right-cont-inside2">
                <h2>Find Your Perfect Companion</h2>
                <p>Explore pets from different shelters and find the one that's right for you.</p>
                </div>

                <div className="hero-btn-space">
                <a href="/pets">Browse Pets</a>
                 <a href="/shelters">Browse Shelters</a>
                 </div>

                 </div>




            </div>
          
        </div>


          <HowItWorks/>
          <Footer/>
          
        </div>
    )
}