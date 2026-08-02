import React from "react";
import { FaPaw } from "react-icons/fa";
import { useState } from "react";
import "../css/Signup.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "../components/Auth.js";


export default function Signup(){

    const navigate = useNavigate();
    const [formData, setFormData] = useState({

fullname: "", email: "", password: "", confirm_password: ""

    })

    const [role, setRole] = useState("adopter")



    const handleChange = (e) =>{

        setFormData({...formData, [e.target.name] : e.target.value})
    }


    const handleSubmit = async (e) =>{

        e.preventDefault();


        let url = ""

        if(role === "adopter"){

            url = '/signup'
        }
        else{

            url ='/signup_shelter_plus_user'
        }


        const res = await fetch(url, {

method: "POST",
headers: {
    'Content-Type': 'application/json'}
    ,
    body: JSON.stringify({
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
        role: role

    })
}
        );

        const data = await res.json();

        if(res.ok){
            const token = data.token;

            localStorage.setItem("token", token);


             const person2 = getUser();
            
                const user_role = person2?.role;
            
            
            
                if(user_role === "shelter"){
                navigate('/complete_shelter_profile_new');
                }
            
                if(user_role === "adopter"){
                navigate('/adopter_dashboard');
                }

        }
        

    }



return(

    
    

    <div className="signup-main">


        <div className="signup-left">


            <div className="signup-left-container">

            <FaPaw className="paw-icon"/>

<h2>Find your perfect companion
</h2>

<p>Already have an account? {""} <a href="/login">Log In</a></p>
            </div>

        </div>


        <div className="signup-right" >


            <form className="signup-right-form" onSubmit={handleSubmit}>

                <h2>Create Your Account</h2>

                <input type="text"
                name="fullname"
                value={formData.fullname}
                placeholder="Full Name"
                onChange={handleChange}
                required>
                </input>

                   <input type="email"
                   name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                required>
                </input>


                   <input type="password"
                   name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                required>
                </input>
                
                   <input type="password"
                   name="confirm_password"
                value={formData.confirm_password}
                placeholder="Confirm Password"
                onChange={handleChange}
                required>
                </input>


                <div className="signup-radio">
                <label>

                    <input type="radio"
                     name="role" value= "adopter"
                    checked={role === "adopter"}
                    onChange={(e) => setRole(e.target.value)}
                    required></input>
                    Adopter
                </label>

                <label>

                    <input
                    type="radio"
                    name= "role"
                    value= "shelter"
                    checked={role === "shelter"}
                    onChange={(e) => setRole(e.target.value)}
                    required></input>
                    Shelter
                </label>

                </div>

                <button type="submit" className="signup-btn"> Sign Up</button>









            </form>
            
            
            
            </div>



        </div>





)
}