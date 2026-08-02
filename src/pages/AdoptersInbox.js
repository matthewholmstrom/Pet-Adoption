import React from "react";
import { useState, useEffect } from "react";
import { getUser } from "../components/Auth";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";



export default function AdopterInbox (){

    const person = getUser();
    const token = localStorage.getItem("token");
    const user_id = person?.id;

    const [toast, setToast] = useState(null);

    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [conversationsName, setConversationsName] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState("");
    const [headerName, setHeaderName] = useState("Select a conversation");
    const [message_text, setMessage_text] = useState("");

    const [searchText, setSearchText] = useState("");

    let conv_filtered = conversations;


    useEffect(() =>{


        const getConversations = async () =>{


            const res = await fetch(`/conversations/`,

                {headers: {"Authorization": "Bearer " +token}}
            );

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
    }, [token]);




    const getMessages = async (conv) =>{




        const res = await fetch(`/messages/${conv.id}`,
            {headers: {"Authorization" : "Bearer " + token}}
        );

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

            setToast({type: "error",
                message: "You have to select a conversation before you can send a message."}
            )

            return
        }

        const res = await fetch('/messages', 
            {

                method: "POST",
                headers:{'Content-Type': 'application/json',
                    "Authorization" : "Bearer " + token
                },
                   body:JSON.stringify({
                conversation_id: selectedConversation.id,
                message_text: message_text,
            })
            }
        
        );
            const data = await res.json();

            if(!res.ok){

                console.log("an error occured with the response object.");
                return
            }

            setMessage_text("");
            getMessages(selectedConversation);

    }


    if(searchText && conversations.length >0){


        conv_filtered = conversations.filter((conv) =>


            conv.shelter_name.toLowerCase().includes(searchText.toLowerCase())
        )
    };


    return(


        <div className="adopters-messages-main">

            {toast && (

                <Toast toast={toast} closeToast={() => setToast(null)}></Toast>
            )}


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
                    onChange={(e) => setSearchText(e.target.value)}>
                    
                    
                    </input>


                    {conv_filtered.map((convo) =>(


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