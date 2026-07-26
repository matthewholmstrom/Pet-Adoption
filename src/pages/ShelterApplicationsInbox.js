import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getUser } from "../components/Auth";
import { Link } from "react-router-dom";



export default function ShelterApplicationsInbox(){

    const person = getUser();
    const person_id = person.userId;
    const [applications, setApplications] = useState([]);

    const [search_application, set_Search_Application] = useState("");
      const [pet_type, setPet_Type] = useState("All Types");
         const [status, setStatus] = useState("All Statuses");
         let filtered_apps = []



    useEffect(() =>{

        const getApplications = async () =>{

            const res = await fetch(`/shelters_applications/${person_id}`);


             if(!res.ok){

                console.log("Error in the response object from shelter's applications route.");
                return
            }

            const data = await res.json();

            setApplications(data);


        };

        getApplications();
    }, [person_id]);




const new_date = (date) =>{


    return new Date(date).toLocaleDateString([], {

        month : "long",
        day: "numeric",
        year: "numeric"
    })
}



filtered_apps = applications



filtered_apps = filtered_apps.filter((app)=>

    app.pet_name.toLowerCase().includes(search_application.toLowerCase())

);



if(pet_type === "Other"){
    
    filtered_apps = filtered_apps.filter((app) =>
    
        app.pet_type !== "Dog" && app.pet_type !== "Cat"
    
    )
}
else if(pet_type !== "All Types"){


    filtered_apps = filtered_apps.filter((app) =>

        app.pet_type === pet_type)
}


if(status !== "All Statuses"){


    filtered_apps = filtered_apps.filter((app) =>

        app.application_status.toLowerCase()=== status.toLowerCase())
}


    

    return(

        <div className="shelter-application-inbox-main">

            <Sidebar/>


            <div className="shelter-application-inbox-right">


                <div className="shelter-application-inbox-column">


                      <div className="shelter-application-inbox-top">


                      <div className="shelter-application-inbox-top-first">
                       <h1>My Applications</h1>
                       <p>View and Manage your shelter's applications here</p>
                       </div>


<div className="shelter-application-inbox-search">


<input

type="text"
value={search_application}
onChange={(e) => set_Search_Application(e.target.value)}
placeholder="Search pets..."></input>





<select
name= "pet_type"
value={pet_type}
onChange={(e) => setPet_Type(e.target.value)}
>




        <option
        value="All Types">
All Types

        </option>

        <option
        value="Dog">Dog</option>

        <option
        value="Cat">Cat</option>

               <option
        value="Other">Other</option>


</select>


<select
name= "status"
value={status}
onChange={(e) => setStatus(e.target.value)}
>




        <option
        value="All Statuses">
All Statuses

        </option>

        <option
        value="under review">Under Review</option>

        <option
        value="approved">Approved</option>

               <option
        value="rejected">Rejected</option>

    
</select>

</div>

                      </div>









    <table className="shelter-application-inbox-table">

        <thead>
            <tr>
            <th>Photo</th>
            <th>Pet Name</th>
            <th>Applicant</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Action</th>
            </tr>
        </thead>



        <tbody>


{filtered_apps && filtered_apps.map((app) =>(



<tr key={app.id}>
            <td><img src={app.pet_image} className="shelter-app-inbox-img"></img></td>
            <td>{app.pet_name}</td>
            <td>{app.applicant_name}</td>
            <td>{new_date(app.created_at)}</td>
            <td>{app.application_status}</td>
            <td><Link to= {`/shelter_application_details/${app.id}`} className="shelter-app-inbox-link">View</Link></td>
            </tr>

           ) )}


        </tbody>
    </table>
                






                </div>

                </div>


        </div>
    )
    



}
