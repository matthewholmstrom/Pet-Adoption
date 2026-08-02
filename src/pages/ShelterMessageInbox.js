import React from "react";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getUser } from "../components/Auth";
import Toast from "../components/Toast";


export default function ShelterMessageInbox (){

    const person = getUser();

    const [toast, setToast] = useState(null);
    const u_id = person.id;

    const user_role = person.role;

    const token = localStorage.getItem("token");


    const [selected_conversation, setSelectedConversation] = useState("");


    const [conversations, setConversations] = useState([]);
    
    const [messages, setMessages] = useState([]);

    const [searchName, setSearchName] = useState("");

    const [message_text, setMessage_Text] = useState("");
    const [conversation_id, setCoversation_Id] = useState("");

    let conv_filtered = conversations;


    useEffect(() =>{


        const getConversations = async () =>{


            const res = await fetch(`/shelters_side_conversations/`,
                {
                    headers: {"Authorization": "Bearer " + token}
                }
            );


            const data = await res.json();



                 if(!res.ok){

                console.log("An error occured in the response");
                return
            }

            setConversations(data);


            




            }
        

        getConversations();



    }, [token]);


    const showMessages = async (conv_id) =>{

        setMessages([]);


        const res = await fetch(`/get_shelters_messages/${conv_id}`,{
            headers: {"Authorization" : "Bearer " +token}}
        );


        const data = await res.json();

        
                 if(!res.ok){

                console.log("An error occured in the response");
                return
            }
setSelectedConversation(data[0].user_name);
setCoversation_Id(conv_id);

console.log(conv_id);
            setMessages(data);



    }



    const sendMessage = async () =>{

        if(!message_text){
            console.log("Error: invalid message text");
            return
        };

           if(!conversation_id){

            setToast({type: "error",
                message: "You have to select a conversation before you can send a message."}
            )

            return
        }



        const res = await fetch('/messages_contact', {

            method: "POST",
            headers: {'Content-Type': 'application/json',
                "Authorization": "Bearer " +token
            },
            body: JSON.stringify({
                message_text: message_text,
                conversation_id: conversation_id

            })
        });

          if(!res.ok){

                console.log("An error occured in the response");
                return
    }

    const data = await res.json();
    setMessages((prev) => [...prev, {id: data.message_id,
        sender_id: u_id,
        sender_type: user_role,
        message_text,
        conversation_id
    }])

    setMessage_Text("");
}




            if(searchName && conversations.length >0){

                conv_filtered = conversations.filter((conv) =>
                
                    conv.user_name.toLowerCase().includes(searchName.toLocaleLowerCase()))}


    return(

        <div className="shelter-message-inbox-main">

            {toast && (

                <Toast toast={toast} closeToast={() => setToast(null)}></Toast>
            )}



            <Sidebar></Sidebar>


                    <div className="shelter-message-inbox-right">



     <div  className="shelters-message-right-container-top-spacing">

                    <div className="shelters-message-right-container-top-inside">

 <h1>Messages</h1>

 <p>View and manage your conversations with adopters.</p>

 </div>



 <div className="shelter-message-inbox-right-cont">
                        <div className="shelter-message-inbox-sidebar-left">

                            <h1>Messages</h1>


                            <input
                            type="text"
                            placeholder="Search..."
                            value={searchName}
                            onChange={(e)=> setSearchName(e.target.value)}></input>


                            {conv_filtered && conv_filtered.map((convo) =>(



                                <button onClick={(e) =>showMessages(convo.id)} key={convo.id} className= {conversation_id === convo.id? "shelter-conversation-selected-btn active": "shelter-conversation-selected-btn"}>{convo.user_name}</button>

                            )
                            )}






                        </div>






                        <div className="shelter-message-inbox-right-center">

                            <div className="shelter-message-inbox-right-center-top">


                            <h2>{selected_conversation || "Select a Conversation"}</h2>



                            </div>



                               <div className="shelter-message-inbox-right-center-middle">


                            {messages.map((message) => (

                                <div className= {message.sender_id === u_id ? "shelter-message-from-shelter": "shelter-message-from-adopter"}
                                
                                key={message.id}>

                                    {message.message_text}
                                </div>

                            ))}

                            </div>


                      

                                      <div className="shelter-message-inbox-right-center-bottom">


                                        <input
placeholder="Type a message..."
                                        type="text"
                                        name="message_text"
                                        value={message_text}
                                        onChange={(e) => setMessage_Text(e.target.value)}
                                        
                                        
                                        ></input>


                                        <button className="shelter-message-inbox-right-center-bottom-btn"
                                        onClick={sendMessage}> Send</button>
                                      </div>


  </div>


                        

                            
                        </div>




</div>


                        </div>




            
        </div>
    )

}
