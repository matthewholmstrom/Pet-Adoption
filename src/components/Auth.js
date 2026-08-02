import React from "react";
import {jwtDecode} from "jwt-decode"


export function getUser(){

    const token = localStorage.getItem("token");

    if(!token){

        return null
    }
    return jwtDecode(token);
}


export function Logout(){

    localStorage.removeItem("token");
    return
}