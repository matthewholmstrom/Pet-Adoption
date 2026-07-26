import React from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "./Auth";
import { FaBookmark, FaClipboardList } from "react-icons/fa";
import {   FaHeart, FaFileAlt, FaComments, FaUserCog
} from "react-icons/fa";


export default function Sidebar (){


    
    const person = getUser();
    
    if(!person){
        return null;
    }
    
    const role = person.role;

    return(

        <div className="sidebar">

            <div className="sidebar-links">

            {role === "adopter"?

            <>
            <NavLink to= "/favorites"> <FaBookmark></FaBookmark> Favorites</NavLink>

                        <NavLink to= "/adopters_applications"> <FaClipboardList></FaClipboardList>Applications</NavLink>

            <NavLink to= "/adopters_inbox"><FaComments></FaComments>Messages</NavLink>

            <NavLink to= "/adopters_account"> <FaUserCog></FaUserCog>Account</NavLink>

            </>:
            <>

             <NavLink to= "/shelter_add_pets"> Add Pets</NavLink>
             <NavLink to= "/shelter_manage_pets"> Manage Pets</NavLink>
                        <NavLink to= "/shelter_applications">Applications</NavLink>

            <NavLink to= "/shelter_messages">Messages</NavLink>
             <NavLink to= "/shelter_profile">Shelter Profile</NavLink>

            <NavLink to= "/shelter_profile_update_user">Account</NavLink>
            
            
            </>
            
        

        
        }
</div>



        </div>


    )
}