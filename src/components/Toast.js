import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";


export default function Toast({toast, closeToast}){


    useEffect(() =>{


        const timer = setTimeout(() =>{


            closeToast();
        }, 3000);

        return () => clearTimeout(timer)
    
 }, [toast, closeToast] )





 return(

    <div className= {`toast ${toast.type}`}>

        <span className="toast-icon">

            {toast.type === "success" ? <FaCheckCircle/>:  <FaExclamationCircle/> }
        </span>

        <p>{toast.message}</p>

        <button onClick={closeToast}>
              <FaTimes/>
        </button>
    </div>


 )
    




}