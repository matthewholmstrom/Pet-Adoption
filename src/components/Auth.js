import React from "react";


export function getUser(){

    const person = localStorage.getItem("person");
    return person? JSON.parse(person): null;
}


export function Logout(){

    localStorage.removeItem("person");
    return
}