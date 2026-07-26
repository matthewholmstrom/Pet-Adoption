import Header from "./components/Header.js"
import Signup from  "./pages/Signup.js"
import Login from  "./pages/Login.js"
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import {useState,useEffect } from "react";
import HeroSection from "./components/HeroSection.js"
import Footer from "./components/Footer.js"
import Pets from "./pages/Pets.js"
import PetInfo from "./pages/PetInfo.js";
import SheltersPage from "./pages/ShelterPage.js";
import ShelterInfo from "./pages/ShelterInfo.js";
import NonPetMessageShelter from "./pages/NonPetMessageShelter.js";
import SheltersPets from "./pages/SheltersPets.js";
import Favorites from "./pages/Favorites.js";
import ApplyPage from "./pages/ApplyPage.js";
import AdopterApplicationsInbox from "./pages/AdopterApplicationsInbox.js";
import AdopterInbox from "./pages/AdoptersInbox.js";
import AdoptersAccount from "./pages/AdoptersAccount.js";
import SheltersManagePets from "./pages/SheltersManagePets.js";
import SheltersEditPet from "./pages/SheltersEditPet.js";
import ShelterApplicationsInbox from "./pages/ShelterApplicationsInbox.js";
import ShelterApplicationDetails from "./pages/ShelterApplicationDetail.js";
import ShelterMessageInbox from "./pages/ShelterMessageInbox.js";
import ShelterEditInfo from "./pages/ShelterEditInfo.js";
import AdopterDashboard from "./pages/AdopterDashboard.js";
import ShelterProfileUpdate from "./pages/ShelterProfileUpdate.js";
import MessageAboutPet from "./pages/MessageAboutPet.js";
import { getUser } from "./components/Auth.js";
import { Navigate } from "react-router-dom";
import CompleteShelterProfile from "./pages/CompleteShelterProfile.js";

import ShelterDashboard from "./pages/ShelterDashboard.js";
import ShelterAddPet from "./pages/ShelterAddPet.js";


function ProtectedRoute ({children, allowedRole}){


  const user = getUser();
  if(!user){

    return <Navigate to="/login"/>
  }


  if(user.role !== allowedRole){

    return <Navigate to="/"/>
  }

  return children

}



function App() {


  return (
    
    <BrowserRouter>
    
    <div className="page-layout">

    <Header/>

    <div className="page-routes">



    <Routes>


      <Route path ="/signup" element = {<Signup/>}/>


        <Route path = "/login" element = {<Login/>}></Route>
        <Route path = "/" element = {<HeroSection/>}></Route>

                <Route path = "/pets" element = {
                 
                  <Pets/>
       
                  }></Route>
                  
                <Route path = "/shelters" element = {<SheltersPage/>}></Route>

                <Route path = "/pet/:id" element = {<PetInfo/>}></Route>

<Route path="/shelter/:id" element ={<ShelterInfo/>
}></Route>

<Route path="/shelters_pets/:id/:name/:city/:state" element = {<SheltersPets/>}></Route>




<Route path="/contact_shelter/:id" element ={
  
  <ProtectedRoute allowedRole = "adopter">
  
  <NonPetMessageShelter/>
  </ProtectedRoute>

}></Route>





<Route path="/favorites" element= {
  
  <ProtectedRoute allowedRole= "adopter">
  <Favorites/>
  </ProtectedRoute>
  
  }></Route>

  <Route path="/adopters_inbox" element={

    <ProtectedRoute allowedRole= "adopter">
    <AdopterInbox/>
    </ProtectedRoute>
    
    }></Route>



    <Route path="/adopters_applications" element ={

      <ProtectedRoute allowedRole= "adopter">
      <AdopterApplicationsInbox/>
      </ProtectedRoute>
      
      }> </Route>



<Route path="/adopters_account" element={

  <ProtectedRoute allowedRole= "adopter">
  <AdoptersAccount/>
  </ProtectedRoute>}
  ></Route>


  <Route path="/adopter_dashboard" element={
  <ProtectedRoute allowedRole= "adopter">
  <AdopterDashboard/>
  </ProtectedRoute>}
  ></Route>



<Route path="/pet_apply/:pet_id" element={
  <ProtectedRoute allowedRole= "adopter">
  
  <ApplyPage/>
  </ProtectedRoute>
  
  }></Route>


 <Route path = "/message_about_pet/:pet_id" element = {
  
  <ProtectedRoute allowedRole= "adopter">
  <MessageAboutPet/>
  </ProtectedRoute>
  
  }></Route>






<Route path="/shelter_add_pets" element={

  <ProtectedRoute allowedRole= "shelter">

    <ShelterAddPet/>
  </ProtectedRoute>
}></Route>




<Route path="/shelter_manage_pets" element={
  
  <ProtectedRoute allowedRole= "shelter">
  <SheltersManagePets/>
  </ProtectedRoute>
  }></Route>


<Route path='/complete_shelter_profile_new' element={<ProtectedRoute
  allowedRole= "shelter">

    <CompleteShelterProfile/>
  </ProtectedRoute>
}></Route>


<Route path="/shelters_edit_pet/:pet_id" element ={
  
  <ProtectedRoute allowedRole= "shelter">
  <SheltersEditPet/>
  </ProtectedRoute>
  }></Route>




<Route path="/shelter_applications" element ={
  <ProtectedRoute allowedRole= "shelter">
  <ShelterApplicationsInbox/>

  </ProtectedRoute>
  }></Route>



<Route path="/shelter_application_details/:app_id" element={
  <ProtectedRoute allowedRole= "shelter">
  <ShelterApplicationDetails/>
  </ProtectedRoute>
  
  }></Route>



<Route path="/shelter_messages" element={
  
  <ProtectedRoute allowedRole= "shelter">
  <ShelterMessageInbox/>
  </ProtectedRoute>
  
  }></Route>



<Route path="/shelter_profile" element={
  
  <ProtectedRoute allowedRole= "shelter">
  <ShelterEditInfo/>
  </ProtectedRoute>

  }></Route>

<Route path="/shelter_profile_update_user" element={
  
  <ProtectedRoute allowedRole= "shelter">
  
  <ShelterProfileUpdate/>
  </ProtectedRoute>
  
  }></Route>




  <Route path="/shelter_dashboard" element={
  
  <ProtectedRoute allowedRole= "shelter">
  
  <ShelterDashboard/>
  </ProtectedRoute>
  
  }></Route>

    </Routes>
    </div>



</div>
    
    </BrowserRouter>
  
  );
}

export default App;
