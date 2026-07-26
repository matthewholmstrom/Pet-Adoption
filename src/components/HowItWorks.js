import React from "react";
import PetCardSample from "./PetCardSample";



export default function HowItWorks(){

    return(

        <div className="how-it-works-grid">

<div className="how-it-works-row1">

<h2>How It Works</h2>

<div className="how-it-works-cards1">

<div className="how-it-works-card">
    <h2>1.Browse Pets</h2>
    <p>See animals near you in an easy card view</p>

</div>


<div className="how-it-works-card" >
    <h2>2. Swipe & Match</h2>
    <p>Save your favorites and find your perfect match.</p>

</div>


<div className="how-it-works-card">
    <h2>3. Adopt & Stay Updated</h2>
    <p>Meet the pet and get updates from the shelter.</p>

</div>

</div>

</div>



<div className="how-it-works-row2">

    <h2>Meet Some of Our Animals</h2>



<PetCardSample/>





</div>



<div className="how-it-works-row3">

<h2>Our Mission</h2>

<p>We connect loving homes with pets in need. 
    Whether you're looking for a loyal dog, a playful cat, or another adorable companion,
     our platform helps make adoption simple and joyful</p>

</div>





        </div>




    )
}