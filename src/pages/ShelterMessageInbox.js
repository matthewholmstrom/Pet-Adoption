import React from "react";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getUser } from "../components/Auth";


export default function ShelterMessageInbox (){

    const person = getUser();

    const u_id = person.userId;

    const user_role = person.role;


    const [selected_conversation, setSelectedConversation] = useState("");


    const [conversations, setConversations] = useState([]);
    
    const [messages, setMessages] = useState([]);

    const [searchName, setSearchName] = useState("");

    const [message_text, setMessage_Text] = useState("");
    const [conversation_id, setCoversation_Id] = useState("");


    useEffect(() =>{


        const getConversations = async () =>{


            const res = await fetch(`/shelters_side_conversations/${u_id}`);


            const data = await res.json();



                 if(!res.ok){

                console.log("An error occured in the response");
                return
            }

            setConversations(data);
        };

        getConversations();



    }, [u_id]);


    const showMessages = async (conv_id) =>{

        setMessages([]);


        const res = await fetch(`/get_shelters_messages/${conv_id}`);


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



        const res = await fetch('/messages_contact', {

            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({  sender_id: u_id,
                sender_type: user_role,
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



    return(

        <div className="shelter-message-inbox-main">



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


                            {conversations && conversations.map((convo) =>(



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
