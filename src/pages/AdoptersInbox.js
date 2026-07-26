import React from "react";
import { useState, useEffect } from "react";
import { getUser } from "../components/Auth";
import Sidebar from "../components/Sidebar";



export default function AdopterInbox (){


    const person = getUser();

    const user_id = person.userId;

    const role = person.role;
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [conversationsName, setConversationsName] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState("");
    const [headerName, setHeaderName] = useState("Select a conversation");
    const [message_text, setMessage_text] = useState("");


    useEffect(() =>{


        const getConversations = async () =>{


            const res = await fetch(`/conversations/${user_id}`);

            const data = await res.json();
            console.log(data)
            
            if(!res.ok){

                console.log("Error in the response object from conversations route.");
                return
            }

            if(Array.isArray(data)){

                setConversations(data);
                console.log('set conversations to', data);
            }else{

                setConversations([]);
            }

        };

        getConversations();
    }, [user_id]);




    const getMessages = async (conv) =>{




        const res = await fetch(`/messages/${conv.id}`);

        const data = await res.json();
        console.log(data);

        if(!res.ok){

            console.log("Error occurred with the response object from messages.");
            return
        }

        if(Array.isArray(data)){
            setMessages(data);
            setSelectedConversation(conv);
            console.log(data);

            setHeaderName(conv.shelter_name);
        }

        else{

            setMessages([]);
        }


    }


    const sendMessage = async () =>{

        if(!selectedConversation){

            return
        }

        const res = await fetch('/messages', 
            {

                method: "POST",
                headers:{'Content-Type': 'application/json'},
                   body:JSON.stringify({sender_id:user_id,
                conversation_id: selectedConversation.id,
                message_text: message_text,
            sender_type:role})
            }
        
        );
            const data = res.json();

            if(!res.ok){

                console.log("an error occured with the response object.");
                return
            }

    }


    return(


        <div className="adopters-messages-main">


            <Sidebar></Sidebar>


            <div className="adopters-message-right">


                <div  className="adopter-message-right-container-top">

                    <div className="adopter-message-right-container-top-inside">

 <h1>Messages</h1>

 <p>View and manage your conversations with shelters.</p>

 </div>



                <div  className="adopter-message-right-container">
                     


                <div className="adopter-message-sidebar">



    <h2>Conversations</h2>
                  

                    <div className="adopters-message-sidebar-inner">


                    <input placeholder= "Search..." className="adopters-message-search"
                    type="text"
                    onChange={(e) => getMessages(e.target.value)}>
                    
                    
                    </input>


                    {conversations.map((convo) =>(


                    <button key = {convo.id} onClick={()=> getMessages(convo)} className= {selectedConversation?.id === convo.id ? "adopters-conversation-button active":
                        "adopters-conversation-button"
                    }>


                        {convo.shelter_name}
                    </button>

                     ))}

                     </div>
                </div>



                <div className="adopters-message-right-column">



                     <h2 className="adopters-message-right-column-header">

                     {headerName
}
                        
                     </h2>

                 

                     <div className="adopters-message-right-column-middle">


                        {messages? messages.map((message) =>(


                                <div key={message.id} className= {message.sender_id === user_id? "message-from-me": "message-from-them" }>

                                    {message.message_text}
                                </div>

                        )): "No messages yet."
                    }



                     </div>

                     <div className="adopters-message-right-column-bottom">



                        <input className="adopters-message-input"
                        placeholder="Type a message..."
                        value={message_text}
                        onChange={(e) => setMessage_text(e.target.value)}></input>

                        <button className="adopters-message-submit-btn" onClick={sendMessage}>Send</button>


                     </div>



                </div>




</div>

</div>
            </div>



        </div>
    )

}