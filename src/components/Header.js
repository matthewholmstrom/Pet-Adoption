import React from "react";
import {getUser} from "./Auth.js";
import { Logout } from "./Auth.js";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";



export default function Header({isLoggedIn, logout}){

    const person = getUser();

    const user_id = person?.userId;
    const role = person?.role;

    const navigate = useNavigate();

    const Person_Logout = () =>{

        Logout();
        navigate('/')
        
    }

    
    return (

        <div className="header">

            <h2>Pet-Adoption App</h2>

            <div className="header-right">

                {person? <p>Hi, {person.name}</p>: <p></p>}

            <nav className="header-nav">

                {role === "adopter"? (
                    <div className="header-right-container">
                    <NavLink to="/adopter_dashboard">Home</NavLink>
                      <NavLink to="/pets">Pets</NavLink>
                        <NavLink to="/shelters">Shelters</NavLink>
                          <button onClick={Person_Logout}>Log Out</button>
                          </div>
                ):

                role === "shelter"? (

                    <div className="header-right-container">
                    <NavLink to="/shelter_dashboard">Home</NavLink>
                      <NavLink to="/pets">Pets</NavLink>
                        <NavLink to="/shelters">Shelters</NavLink>
                          <button onClick={Person_Logout}>Log Out</button>
                          </div>
                ):

                <div className="header-right-container">
                    <a href="/">Home</a>
                 <NavLink to="/login">Login</NavLink>
                      <NavLink to="/signup">Signup</NavLink>
                      </div>
                
                }
            </nav>

            </div>

            </div>


    )
}