import React from "react";
import { FaPaw } from "react-icons/fa";
import { useState } from "react";
import "../css/Login.css"
import { useNavigate } from "react-router-dom";
import { getUser } from "../components/Auth";


export default function Login(){

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
email: "", password: ""
    });

    const handleChange = (e) =>{

        setFormData({...formData, [e.target.name] : e.target.value})
    }


    const handleSubmit = async (e) =>{

        e.preventDefault();

        try{
        const res = await fetch('/login', {

method: "POST",
headers: {
    'Content-Type': 'application/json'},
    body: JSON.stringify({
        email: formData.email,
        password: formData.password,

    })
})



 const data = await res.json();

 console.log(data);


 if(res.ok){

    const person = {name: data.name, role: data.role, userId: data.id};
    localStorage.setItem("person", JSON.stringify(person));


    const person2 = getUser();

    const user_role = person2?.role;



    if(user_role === "shelter"){
    navigate('/shelter_dashboard');
    }

    if(user_role === "adopter"){
    navigate('/adopter_dashboard');
    }


 }


}
 catch(err){

console.log(err);
 }

}


return(


    <div className="login-main">

        <div className="login-left">

            <div className="login-left-container">

            <FaPaw className="paw-icon"/>

<h2>Welcome Back!
</h2>

<p>Don't have an account? {""} <a href="/signup">Sign Up</a></p>

            </div>

        </div>


        <div className="login-right" >


            <form className="login-right-form" onSubmit={handleSubmit}>

                <h2>Log In</h2>


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



                <button type="submit" className="login-btn"> Log In</button>

            </form>
            
            
            
            </div>



        </div>






    



)
}