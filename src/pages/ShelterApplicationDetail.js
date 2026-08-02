import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { getUser } from "../components/Auth";
import { useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

export default function ShelterApplicationDetails (){

    const {app_id} = useParams();
    const token = localStorage.getItem("token");


    const [application, setApplication] = useState({});

    const [application_decision, setApplication_Decision] = useState("none");


    useEffect(() =>{


        const getApplication = async () =>{


            const res = await fetch(`/get_application_details/${app_id}`,{
                        headers: {"Authorization": "Bearer " + token}}


            );

                if(!res.ok){

    console.log("Error occured with the response object.");
    return
}


const data = await res.json();


if(data.status === "rejected"){


    setApplication_Decision("rej");

    setApplication(data);
    return
}


if(data.status === "approved"){


    setApplication_Decision("approv");
        setApplication(data);

    return
}

    setApplication(data);


        };

        getApplication();
    }, [app_id]);



    const handleStatus = async (status) =>{


        const res = await fetch('/applications_status',{

            method: "PUT",

            headers: {'Content-Type': 'application/json',
                "Authorization": "Bearer " + token,


            },
            body: JSON.stringify({app_id : app_id,
                status: status
            })

        });
                if(!res.ok){

    console.log("Error occured with the response object.");
    return;
};

const data = await res.json();


setApplication((prev) => ({...prev, status: status}));


if(status === "approved"){

    setApplication_Decision("approv");
}else if( status === "rejected"){


     setApplication_Decision("rej");
}else{
     setApplication_Decision("none");


}


}



const new_date = (date) =>{

    return new Date(date).toLocaleDateString([], {

        month: "long",
        year:"numeric",
        day: "numeric"
    })
}


    return(

        <div className="shelter-application-details-main">

            <Sidebar></Sidebar>


              <div className="shelter-application-details-right">



                <div className="shelter-application-details-grid-wrapper">




                       <div className="shelter-application-details-grid-row1">


                        <Link to={"/shelter_applications"} className="shelter-app-details-back-btn"><MdArrowBack className="shelter-application-details-icon"></MdArrowBack><span>Back</span></Link>

                        <div className="shelter-app-details-row1-space">
                            <h1>Application Details</h1>
                       
                        <p>Submitted: {new_date(application.created_at)}</p>

                        </div>


                        <div className= {application.status === "under review"?
                         "under-review-notice":
                        
                        application.status === "approved"? "approved-notice":

                        application.status === "rejected"? "rejected-notice": " "
                    
                    
                    }>{application.status === "under review"? "Under Review":
                    application.status === "approved"? "Approved":
                    application.status === "rejected"? "Rejected":""
                    
                    
                    }</div>


                    </div>


                <div className="shelter-application-details-grid">



                      <div className="shelter-application-details-grid-row2-col1">
                        <h2>Pet Information</h2>

                        <img src={application.pet_image}></img> 


                        <div className="shelter-application-details-pet-info-spacing">
                        <p>Name</p>
                        <p>{application.pet_name}</p>
                        </div>


                        <div className="shelter-application-details-pet-info-spacing">
                        <p>Type</p>
                        <p>{application.pet_type}</p>
                        </div>

                        <div className="shelter-application-details-pet-info-spacing">
                        <p>Breed</p>
                        <p>{application.pet_breed}</p>
                        </div>


                        <div className="shelter-application-details-pet-info-spacing">
                        <p>Age</p>
                        <p>{application.pet_age}</p>
                        </div>

                        <div className="shelter-application-details-pet-info-spacing">
                        <p>Size</p>
                        <p>{application.pet_size}</p>
                        </div>



                      </div>




                      <div className="shelter-application-details-grid-row2-col2">
                        <h2>Applicant</h2>

                        


                        <div className="shelter-application-details-pet-info-spacing">
                        <p>Name</p>
                        <p>{application.applicant_name}</p>
                        </div>

                        
                        <div className="shelter-application-details-pet-info-spacing">
                        <p>Application Number</p>
                        <p>{application.id}</p>
                        </div>


                        <div className="shelter-application-details-pet-info-spacing">
                        <p> Experience</p>
                        <p>{application.experience}</p>
                        </div>

                        <div className="shelter-application-details-pet-info-spacing">
                        <p>Activity Level</p>
                        <p>{application.activity_level}</p>
                        </div>


                        <div className="shelter-application-details-pet-info-spacing">
                        <p>Yard</p>
                        <p>{application.yard}</p>
                        </div>

                        <div className="shelter-application-details-pet-info-spacing">
                        <p>Hours Alone</p>
                        <p>{application.hours_alone}</p>
                        </div>


                         <div className="shelter-application-details-pet-info-spacing">
                        <p>Other Pets</p>
                        <p>{application.other_pets}</p>
                        </div>

                        <div className="shelter-application-details-pet-info-spacing">
                        <p>Children</p>
                        <p>{application.children}</p>
                        </div>


                      </div>



                         <div className="shelter-application-details-grid-row3">



                        <h2>Applicant Message</h2>
                        <div className="shelter-application-details-pet-info-message">{application.message}</div>


                    </div>



                    
                         <div className="shelter-application-details-grid-row4">



                        <h2>Decision</h2>


{application_decision === "none" ?(


                        <div className="shelter-application-details-btn-cont"><button onClick={() => handleStatus("approved")} className="shelter-application-details-approve-btn">Approve</button> <button onClick={() => handleStatus("rejected")} className="shelter-application-details-reject-btn">Reject</button></div>

                        ):application_decision === "rej" ?(
  

                                                <div><button onClick={() => handleStatus("under review")} className="shelter-application-details-reinstate-btn">Reinstate</button></div>

                        
                        
                        
                        ): application_decision === "approv"?(


                                                                                <div><button onClick={() => handleStatus("under review")} className="shelter-application-details-cancel-btn">Cancel Approval</button> </div>


                        ):null }


                    </div>






                </div>

                </div>
              </div>
        </div>
    )



    
}