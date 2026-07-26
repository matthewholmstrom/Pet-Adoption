import React from "react";
import { getUser } from "../components/Auth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";


export default function MessageAboutPet (){


    const person = getUser();
    const user_id = person.userId;
    const role = person.role;

    const [message, setMessage] = useState("");

    const [messageReason,setMessageReason] = useState("Adoption Inquiry");

    const [shelt_info, setShelt_Info] = useState({});

    const {pet_id} = useParams();

    



    useEffect(() =>{

        const getShelter = async () =>{


            const res = await fetch(`/shelter_from_pet/${pet_id}`);

               if(!res.ok){

                console.log("An error occured in the response");
                return
            }


            const data = await res.json();

            setShelt_Info(data)

        };

        getShelter();

    }, [pet_id]);



    const sendMessage = async (e) =>{


        e.preventDefault();


        if(!pet_id||!shelt_info.shelter_id||!user_id||!message||!messageReason)
        {
            console.log("User ID, Shelter ID, message, reason, or Pet ID are missing.");
            return
        }




        const res = await fetch('/message_about_pet', {

            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id:user_id,
                shelter_id: shelt_info.shelter_id,
                message_text: message, 
                pet_id: pet_id,
                reason: messageReason,
                role: role
            })
        });

          if(!res.ok){

                console.log("error: in the response");
                return
            }

    }


    return(

        <div className="message-about-pet-main">

            <Sidebar></Sidebar>



 <div className="message-about-pet-right">




<div className="message-about-pet-right-top-space">

   <h1>Message Shelter</h1>

   <p>Send a message to the shelter about this pet.</p>
   </div>



    <div className="message-about-pet-form-container">


          <div className="message-about-pet-top">




            <div className="message-about-pet-image-container">



                <img src= {shelt_info.pet_image} className="message-about-pet-img">
                
                
                </img>


                <div className="message-about-pet-image-container-right">



                    <div className="message-about-pet-image-container-right-info">

                    <h2>{shelt_info.pet_name}
                    </h2>


                    <p>{shelt_info.pet_breed}</p>


                      <p>{shelt_info.shelter_name}</p>

                      </div>

                </div>


            </div>


</div>


            <form onSubmit={sendMessage} className="message-about-pet-form">


<div className="message-about-pet-form-top">
                <label>Reason for Message</label>


                <select
                required
                value={messageReason}
                onChange={(e) => setMessageReason(e.target.value)}>


                    <option
                    value= "Adoption Inquiry">Adoption Inquiry</option>

  
                        <option
                        value= "All Types">Meet & Greet Request</option>

                        
                        <option
                        value= "Availability Question">Availability Question</option>
                        
                        <option
                        value= "Medical History">Medical History</option>
                        
                        <option
                        value= "Behavior Question">Behavior Question</option>

                        <option
                        value= "Other">Other</option>



                </select>


                </div>


                <div className="message-about-pet-form-bottom">


                <label>Message</label>

                <textarea
                required
                placeholder="Write your message..."
                
                value={message}
                
                onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>

<div className="message-about-pet-form-bottom-button-cont">

                <button className="message-about-pet-button"> Send Message</button>
                </div>


            </form>

  
    </div>

    </div>
 </div>





      
    )



    












}