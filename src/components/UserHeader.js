import React from "react";
import {getUser} from "./Auth.js";




export default function UserHeader(){

    const person = getUser()

return(


    <div className="user-header">



        <nav>

            <p>Hello {person.name}</p>
                <a href="#"></a> 
        </nav>
    </div>
)


}