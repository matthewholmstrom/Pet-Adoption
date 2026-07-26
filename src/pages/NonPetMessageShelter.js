import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { getUser } from "../components/Auth";




export default function NonPetMessageShelter() {


    const [searchParams] = useSearchParams();

    const {id} = useParams();

    const shelter_name = searchParams.get("shelt_name");
    console.log(shelter_name);

    const [message, setMessage] = useState("");
    const [reason, setReason] = useState("Select a Reason");
    const [user_name, set_user_name] = useState("")
    const [user_id, set_user_id] = useState("");
    const [role, set_role] = useState("")
    const [shelt_id, set_shelt_id] = useState(id);
    const [conv_id, set_conv_id] = useState("");

 

    useEffect(() =>{


           const person = getUser();
    if(!person){
return     
    }

    const person1_name = person.name;
    const person1_role = person.role;



 set_user_name(person.name);
        set_role(person.role);



            const fetchUser = async ()=>{

                const res = await fetch(`/user_info?name=${encodeURIComponent(person1_name)}&role=${encodeURIComponent(person1_role)}`);

                const data = await res.json();



                if(res.ok){

                    set_user_id(data);
                }
         }

         fetchUser();

        }, []
     )




    const handleSubmit = async (e) =>{

        if(!user_id|| !shelt_id|| !message || !role){

            return
        }

        e.preventDefault();

        const res1 = await fetch(`/conversations_start`,

            {method: "POST",
                headers:{"Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user_id,
                    shelter_id: shelt_id
                })

            }
        );





        const data = await res1.json();


        if(!res1.ok || !data.conversation_id){
            console.log("error: res1 not okay or converstation_id is null");
            return

        }
        const not_stale_conv_id = data.conversation_id;

        if(res1.ok){

            set_conv_id(data.conversation_id);
        }


try{
        const res2 = await fetch(`/messages_contact`, {

            method: "POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({ sender_id: user_id,
                sender_type: role,
                message_text: message,
                conversation_id: not_stale_conv_id

            })

        });

        const data1 = await res2.json();

    }catch(err){

        console.log("This error occured: ", err)
    }
        

    }





    return(

<div className="contact_shelter_main">

    <Sidebar></Sidebar>


<div className="contact_shelter_right">

    <div className="contact_shelter-cont-top">

    <h1 className="h1-shelter-contact">Contact {shelter_name}</h1>
    <p>Send a message to the shelter regarding a pet or general inquiry.</p>
    </div>


<div className="contact_shelter-cont">


<form onSubmit={handleSubmit} className="shelter-contact-form">

    <label htmlFor="reason">
Reason for Message
    </label>

    <select
    required
    id="reason"
    name="reason"
    value={reason}
    onChange={(e)=> setReason(e.target.value)}>



        <option
        value="adoption inquiry">
Adoption Inquiry

        </option>

        <option
        value="general message">General Message</option>

        <option
        value="meet and greet">Meet & Greet Request</option>

               <option
        value="availability question">Availability Question</option>



    </select>


    <label htmlFor="message-area">
        Message
    </label>

    <textarea

    required
    id ="message-area"
    placeholder="Write your message here..."
    value={message}
    name="message"
    onChange={(e) => setMessage(e.target.value)}
    
    >



    </textarea>

<div className="contact-shelter-btn-cont">
<button className="contact-shelter-button">Send Message</button>
</div>



</form>


</div>
</div>


</div>


    )


}





