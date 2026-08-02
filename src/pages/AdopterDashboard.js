import React from "react";

import { useState, useEffect } from "react";

import { getUser } from "../components/Auth";
import Sidebar from "../components/Sidebar";


export default function AdopterDashboard(){


    const token = localStorage.getItem("token");


const [dashboardInfo, setDashboardInfo] = useState({
    favorite_count: 0,
    application_count: 0,
    conversation_count: 0,
    recent_applications: [],
    recent_conversations: [],
    favorite_pets: []
});


    useEffect(() =>{



        const getInfo = async () =>{




            const res = await fetch(`/adopter_dashboard_info/`,

                {headers: {"Authorization": "Bearer " +token}}
            );


               if(!res.ok){

                console.log("Error in the response object.");
                return
            }


            const data = await res.json();
            console.log(data);
            setDashboardInfo(data);

        };

        getInfo();
    }, []);
    

          

    const updated_date = (date) =>{


        return new Date(date).toLocaleDateString([], {

            month: "long",
            day: "numeric",
            year: "numeric"
        })
    }




    return(


        <div className="adopters-dashboard-main">

            <Sidebar>
            </Sidebar>

            <div className="adopters-dashboard-right">



            <div className="adopters-dashboard-top">

                <h1>Adopter Dashboard </h1>

<p>Welcome back! Here's what has happened recently</p>
            </div>


            <div className="adopters-dashboard-grid">


                <div className="adopters-dashboard-grid-card1">

                    <h3>Favorite Pets</h3>
                    <p>{dashboardInfo.favorite_count}</p>

                </div>



                
                <div className="adopters-dashboard-grid-card2">

                    <h3>Applications</h3>
                    <p>{dashboardInfo.application_count}</p>

                </div>


                 <div className="adopters-dashboard-grid-card3">

                    <h3>Conversations</h3>
                    <p>{dashboardInfo.conversation_count}</p>

                </div>


                 <div className="adopters-dashboard-grid-card4">

                    <h3>Recent Applications</h3>

                    <table className="adopters-dashboard-grid-table">


                        <thead>

                            <tr>
                                <th>Name</th>
                                   <th>Shelter</th>
                                      <th>Status</th>
                                         <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>


                           {dashboardInfo.recent_applications.map((appl) =>( <tr key={appl.application_id}>



                            <td>{appl.application_pet_name}</td>

                             <td>{appl.application_shelter_name}</td>

                              <td>{appl.application_status}</td>

                               <td>{updated_date(appl.application_created_at)}</td>
                           </tr>

                           ))
                           }
                        </tbody>

                    </table>



                </div>


                 <div className="adopters-dashboard-grid-card5">



                     <h3>Recent Conversations</h3>

                    <table className="adopters-dashboard-grid-table">


                        <thead>

                            <tr>
                                <th>Shelter</th>
                                   <th>Name</th>
                                      <th>Reason</th>
                                         <th>Last Message</th>
                            </tr>

                        </thead>
                        <tbody>


                           {dashboardInfo.recent_conversations.map((conv) =>( <tr key={conv.conversation_id}>



                            <td>{conv.conversation_shelter_name}</td>

                             <td>{conv.conversation_pet_name}</td>

                              <td>{conv.conversation_reason}</td>

                               <td>{conv.recent_message}</td>
                           </tr>

                           ))
                           }
                        </tbody>

                    </table>


                </div>


                 <div className="adopters-dashboard-grid-card6">


                     <h3>Favorite Pets</h3>

                    <table className="adopters-dashboard-grid-table">


                        <thead>

                            <tr>
                                <th>Name</th>
                                   <th>Shelter</th>
                            
                            </tr>

                        </thead>
                        <tbody>


                           {dashboardInfo.favorite_pets.map((fav) =>( <tr key={fav.favorite_id}>



                            <td>{fav.favorite_shelter_name}</td>

                             <td>{fav.favorite_pet_name}</td>


                           </tr>

                           ))
                           }
                        </tbody>

                    </table>

                </div>



                </div>





            </div>
        </div>
    )



}