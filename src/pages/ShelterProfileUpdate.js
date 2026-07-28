import React from "react";

import { useEffect,useState } from "react";
import { getUser } from "../components/Auth";
import Sidebar from "../components/Sidebar";
import { FaExclamationTriangle } from "react-icons/fa";
import { Logout } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";



export default function ShelterProfileUpdate (){


    const navigate = useNavigate();

    const person = getUser();

    const role = person.role;
    const user_id = person.userId;

    const [shelter_info, setShelter_Info] = useState({});

    const [toast, setToast] = useState(null);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [oldPassword, setOldPassword] = useState("");

    const [deleteModal, setDeleteModal] = useState(false);




    const updateName = async () =>{

           if(!name.trim()){
         alert("Name cannot be empty");
        return;
        
        }

      
        const res = await fetch('/shelter_user_name/',{

            method: "PUT",
            headers: {'Content-Type': 'application/json'},

            body: JSON.stringify({

                name:name,
                user_id: user_id
            })

        }
            
        )

           if(!res.ok){

            console.log("An error occured with the response");
            
      setToast({type: "error",
                                    message: "Account name could not be updated."
            });

            return
        };

        
      setToast({type: "success",
                                    message: "Account name was updated successfully."
            });

    }




    
    const updateEmail = async () =>{


           if(!email.trim()){
         alert("Email cannot be empty");
        return;
        
        }

      
        const res = await fetch('/shelter_user_email/',{

            method: "PUT",
            headers: {'Content-Type': 'application/json'},

            body: JSON.stringify({

                email:email,
                user_id: user_id
            })

        }
            
        )

           if(!res.ok){

            console.log("An error occured with the response");

             setToast({type: "error",
                                    message: "Account email could not be updated."
            });
            return
        }

         setToast({type: "success",
                                    message: "Account email was successfully updated."
            });
        
    }

    
    
    const updatePassword = async () =>{



        if(!oldPassword||!newPassword||!confirmPassword){

            console.log("All form fields for password change required.");
            return
        }


            if(newPassword !==confirmPassword){

            console.log("The new password must match confirm password.");
            return
        }


      
        const res = await fetch('/shelter_user_password/',{

            method: "PUT",
            headers: {'Content-Type': 'application/json'},

            body: JSON.stringify({

                oldPassword:oldPassword,
                newPassword:newPassword,
                user_id: user_id
            })

        }
            
        )

           if(!res.ok){

            console.log("An error occured with the response");

                setToast({type: "error",
                                    message: "Account password could not be updated."
            });
            return
            
        }

            setToast({type: "success",
                                    message: "Account password was successfully updated."
            });

            setConfirmPassword("");
            setNewPassword("");
            setOldPassword("")

    
        
    }




        
    const handleDelete = async () =>{

      
        const res = await fetch('/shelter_user_delete/',{

            method: "DELETE",
            headers: {'Content-Type': 'application/json'},

            body: JSON.stringify({

                user_id: user_id
            })

        }
            
        )

           if(!res.ok){

            console.log("An error occured with the response");

            setToast({type: "error",
                                    message: "Account deletion was unsuccessful."
            });
            return
        }



    setDeleteModal(false);

        Logout();
        navigate('/');


        
    }





    return(


        <div className="shelter-user-update-main">

            {toast && (

                <Toast toast={toast} closeToast={() => setToast(null)}></Toast>
            )}

        <Sidebar></Sidebar>


        <div className="shelter-user-update-right">


            <div className="shelter-user-update-form">


                
                <div className="shelter-user-update-form-outside-cont-space">


                <h1 className="shelter-user-update-top-h1">Account Settings</h1>

                <p>Manage your account information and preferences. </p>
</div>

                <div className="shelter-user-update-form-outside-cont">


                <div className="shelter-user-update-outside-cont">


                    <h2>Profile</h2>



                    <div className="shelter-user-update-inside-cont-name-space">


        
                    <div className="shelter-user-update-inside-cont">


                        <div className="shelter-user-update-inside-cont2">

                        <label>Name</label>


                       
                       <div className="shelter-user-update-inside-cont2-button-space">

                        <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shelter-user-update-inside-cont2-button-space-input"></input>

                        



                        <button
                        
                        onClick={updateName}>Save</button>

                        </div>

                        </div>

                        </div>


                    



                    <div className="shelter-user-update-inside-cont">


                        <div className="shelter-user-update-inside-cont2">

                        <label>Email</label>


<div className="shelter-user-update-inside-cont2-button-space">
                        <input
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></input>

                        


                        <button
                        
                        onClick={updateEmail}>Save</button>

                        </div>


                        </div>


                    </div>

                    </div>


                    </div>

                    
                    <div className="shelter-user-update-inside-cont-other">

                         <h2>Security</h2>





                        <div className="shelter-user-update-inside-cont2-other">


                            
                        <div className="shelter-user-update-inside-cont2-other-inside">

                        <label>Change Password</label>

                        <input
                        type="password"
                        placeholder="Current Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}></input>


                         <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) =>setNewPassword(e.target.value)}></input>


                         <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}></input>

                        </div>


                        <button
                        
                        onClick={updatePassword}>Update Password</button>

                        </div>


                    </div>


                    <div className="shelter-profile-update-danger">


                        <h2>Danger Zone</h2>

                        <button onClick={()=> setDeleteModal(true)}>Delete Account</button>
                    </div>



{deleteModal &&(
                    <div className="shelter-profile-update-modal-window">

                         <div className="shelter-profile-update-delete-modal">


                            <div className="shelter-profile-update-delete-icon-cont">

                                <FaExclamationTriangle className="shelter-modal-icon"/>
                            </div>


                            <p>Are you sure that you want to delete this user? This action cannot be undone.

                            </p>


                            <div className="shelter-profile-update-delete-button-cont">

                                <button className="shelter-profile-update-delete-button-cancel"
                                onClick={() =>setDeleteModal(false)}
                            
                                >Cancel</button>


                                 <button className="shelter-profile-update-delete-button-delete"
                                onClick={handleDelete}
                            
                                >Delete</button>
                            </div>


                        
                    </div>



                    </div>
)

  }</div> 
   </div>



            </div>



        </div>

        
    )




}