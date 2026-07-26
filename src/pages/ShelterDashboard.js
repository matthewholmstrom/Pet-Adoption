import React from "react";
import { useState, useEffect } from "react";
import { getUser } from "../components/Auth";
import Sidebar from "../components/Sidebar";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

export default function ShelterDashboard(){


    const [dashboardInfo, setDashboardInfo] = useState({
    total_pets: 0,
    total_applications: 0,
    total_conversations: 0,

    pending_applications: 0,
    approved_applications: 0,
    rejected_applications: 0,

    dog_count: 0,
    cat_count: 0,
    other_count: 0,

    favorite_pets: [],
    recent_applications: [],
    recent_conversations: []
});


const petData = [

    {name: "Dog",
        count: dashboardInfo.dog_count
    },

    {name: "Cat",
        count: dashboardInfo.cat_count
    },


     {name: "Other",
        count: dashboardInfo.other_count
    }
];




const appData = [



    {name: "Pending",
        count: dashboardInfo.pending_applications
    },

    {name: "Approved",

        count: dashboardInfo.approved_applications
    },

    {name: "Rejected",

        count: dashboardInfo.rejected_applications
    }
]









    const person = getUser();

    const user_id = person.userId;


    useEffect(() =>{


        const getShelterInfo = async () =>{

        const res = await fetch(`/shelter-dashboard/${user_id}`);

        if(!res.ok){

                console.log("An error occured in the response");
                return
            }


            const data = await res.json();

            console.log(data);

            setDashboardInfo(data);

        };

        getShelterInfo();

    }, [user_id]);


    return(


        <div className="shelter-dashboard-page-main">


            <Sidebar></Sidebar>


          

                         <div className="shelter-dashboard-page-right-wrapper">

                              <div className="shelter-dashboard-page-right-top">
            <h1>Shelter Dashboard</h1>
            <p>Welcome back! Here's what has happened recently.</p>
            </div>




             <div className="shelter-dashboard-page-right">







    <div className="shelter-dashboard-page-right-grid-table-space">


            <div className="shelter-dashboard-page-right-grid">


                <div className="shelter-dashboard-page-right-grid-card1">

                    <h3>Total Pets</h3>
                    <div>{dashboardInfo.total_pets}</div>
                </div>


                
                <div className="shelter-dashboard-page-right-grid-card2">
                    <h3>Total Applications</h3>
                    <div>{dashboardInfo.total_applications}</div>
                </div>


                <div className="shelter-dashboard-page-right-grid-card3">
                    <h3>Pending Applications</h3>
                    <div>{dashboardInfo.total_applications}</div>
                </div>


                <div className="shelter-dashboard-page-right-grid-card4">
                    <h3>Total Coversations</h3>
                    <div>{dashboardInfo.total_conversations}</div>
                </div>




                <div className="shelter-dashboard-page-right-grid-card5">
                    <h3>Pets By Type</h3>
                    <div className="shelter-dashboard-page-right-grid-card5-barchart-cont">

                    <ResponsiveContainer width= "100%" height={300}>

                        <BarChart data={petData}>

                            <CartesianGrid 
                            />
                            <XAxis dataKey= "name"/>
                                <YAxis allowDecimals= {false}/>

                                <Tooltip/>

                                <Bar dataKey= "count"
                                  fill="#3E5A70"/>

                        </BarChart>
                    </ResponsiveContainer>

                    </div>
                </div>


                <div className="shelter-dashboard-page-right-grid-card6">

<h3>Applications By Status</h3>


<div className=" shelter-dashboard-page-right-grid-card5-barchart-cont">

                    <ResponsiveContainer width= "100%" height={300}>

                        <BarChart data={appData}>

                            <CartesianGrid/>
                            <XAxis dataKey= "name"/>
                                <YAxis allowDecimals={false}/>

                                <Tooltip/>

                                <Bar dataKey= "count"
                                 fill="#3E5A70"
                                 />

                        </BarChart>
                    </ResponsiveContainer>

                    </div>







                </div>


                
                


            </div>



            <div className="shelter-dashboard-page-right-bottom-tables">



<div className="shelter-dashboard-page-right-bottom-table1-border">

     <h3>Favorite Pets</h3>

                <table className="shelter-dashboard-page-right-bottom-table1">

                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Favorites</th>

                        </tr>
                    </thead>


                    <tbody>


                        {dashboardInfo.favorite_pets.map((pet) =>(
                        

                        <tr key={pet.pet_id}>

                            <td>

                        {pet.favorite_pet_name}
                            </td>


                            <td>
 {pet.favorite_count}
                            </td>
                        </tr>
                           ))}

                    </tbody>
                </table>

                </div>

          




               

<div className="shelter-dashboard-page-right-bottom-table1-border">

     <h3>Recent Appplications</h3>
                <table className="shelter-dashboard-page-right-bottom-table1">

                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Applicant</th>
                            <th>Message</th>


                        </tr>

                    </thead>

                    <tbody>


                        {dashboardInfo.recent_applications.map((pet) => (
                        

                        <tr key={pet.application_id}>

                            <td>
                                {pet.application_pet_name}
                            </td>


                            <td>
 {pet.application_user_name}
                            </td>
                                                        <td>
 {pet.application_message}
                            </td>

                        </tr>
                           ))}

                    </tbody>
                </table>

                </div>

           


<div className="shelter-dashboard-page-right-bottom-table1-border">

   <h3>Recent Conversations</h3>
                <table className="shelter-dashboard-page-right-bottom-table1">

                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>User</th>
                            <th>Reason</th>


                        </tr>
                    </thead>


                    <tbody>


                        {dashboardInfo.recent_conversations.map((pet) =>(
                        

                        <tr key={pet.conversation_id}>



                            <td>

                        {pet.conversation_pet_name}
                            </td>





                            <td>

                        {pet.conversation_user_name}
                            </td>


                            <td>
 {pet.conversation_reason?  pet.conversation_reason: "No Reason Provided"}
                            </td>



                          
                        </tr>
                           ))}


                    </tbody>
                </table>

                </div>


            </div>

</div>



            </div>


            </div>


           
        </div>
    )
}



















{/*
<div className="shelter-dashboard-page-right-grid-card6">
                    <h3>Applications by Status</h3>


                    <div className="shelter-dashboard-page-right-grid-card6-space-cont">

                <div className="shelter-dashboard-page-right-grid-card6-space">
                        <p>Pending</p> 
                        <p>{dashboardInfo.pending_applications}</p>
                        </div>


                         <div className="shelter-dashboard-page-right-grid-card6-space">
                        <p>Approved</p> 
                        <p>{dashboardInfo.approved_applications}</p>
                        </div>


                        
                         <div className="shelter-dashboard-page-right-grid-card6-space">
                        <p>Rejected</p> 
                        <p>{dashboardInfo.rejected_applications}</p>
                        </div>

                        </div>


                </div>




                */}