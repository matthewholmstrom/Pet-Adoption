import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { getUser } from "../components/Auth";
import { FaExclamationTriangle } from "react-icons/fa";
import { Logout } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";


export default function AdoptersAccount(){

    const navigate = useNavigate();


    const token = localStorage.getItem("token");

    const [new_password, setNew_Password] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [old_password, setOld_Password] = useState("");
    const [toast, setToast] = useState(null);

    const [showModal, setShowModal] = useState(false);
    



    const [confirm_password, setConfirm_Password] = useState("");



    const setAccountName = async () =>{



        if(!name.trim()){
         alert("Name cannot be empty");
        return;
        
        }

        const res = await fetch(`/adopters_account_name`,

            {
                method: "PUT",
                headers: {'Content-Type':'application/json',
                    "Authorization" : "Bearer " + token
                },
                 body: JSON.stringify({
                    name:name

          })

    }
);

const data = await res.json();


if(!res.ok){

    console.log("Error occured with the response object.")

      setToast({type: "error",
                                    message: "Account name could not be updated"
            });
            return

}


      setToast({type: "success",
                                    message: "Account name was updated successfully."
            });
  }



  const setAccountEmail = async () =>{

if(!email.trim()){
         alert("Email cannot be empty");
        return;

}

    const res = await fetch(`/adopters_account_email`,

{method: "PUT",
headers: {'Content-Type': 'application/json',
                        "Authorization" : "Bearer " + token

},
body: JSON.stringify({
email: email

})});


if(!res.ok){


     setToast({type: "error",
                                    message: "Account email could not be updated"
            });
            return

}

     setToast({type: "success",
                                    message: "Account email was updated successfully."
            });
  };
           



  const handleChangePassword = async () =>{



    if(!confirm_password||!new_password||!old_password){

        alert("All three password fields are required to change user the password.");
        return
    }


    
    if(confirm_password !== new_password){

        alert("The new password must match the confirmed password");
        return
    }


    const res = await fetch(`/adopters_account_password`,

        {

            method: "PUT",
            headers:{'Content-Type': 'application/json',
                                    "Authorization" : "Bearer " + token

            },
            body: JSON.stringify({
                new_password: new_password,
                confirm_password: confirm_password,
              
                old_password: old_password

            })
        }
    );

    const data = await res.json();

    if(!res.ok){

    console.log("Error occured with the response object.")
    
     setToast({type: "error",
                                    message: "Account password could not be updated"
            });
            return
}


 setToast({type: "success",
                                    message: "Account password was updated successfully."
            });
            setOld_Password("");
setNew_Password("");
setConfirm_Password("");


  };


  const handleDelete = async () =>{

    setShowModal(false);


    const res = await fetch(`/adopters_account_delete/`,

        {method: "DELETE",
            headers: {'Content-Type': 'application/json',
                                    "Authorization" : "Bearer " + token

            }
        }
    );

    const data = await res.json();

      if(!res.ok){

    console.log("Error occured with the response object.");

     setToast({type: "error",
                                    message: "Account could not be deleted"
            });
    return 
};


 setToast({type: "success",
                                    message: "Account was successfully deleted"
            });



Logout();
navigate('/');


  }



    return(

        <div className="adopters-account-main">

            {toast && (

                <Toast toast = {toast} closeToast={() => setToast(null)}></Toast>
            )}

            <Sidebar></Sidebar>


<div className="adopters-account-right">



    <div className="adopters-account-right-container">


   <div className="adopters-account-right-container-inside">
  <h1> Account Settings</h1>
  <p>Manage your account information and preferences.</p>

  </div>


  
    <div className="adopters-account-total-wrapper">

    <div className="adopters-account-settings">

      


        <div className="adopters-account-settings-profile-top">


        <h2 className="adopters-account-p-title">Profile</h2>


<div className="space-between-labels-adopters-account">

<div className="adopters-account-label-space">
        <label htmlFor="name">

            Name
        </label>


        <div className="adopters-account-name-button-space">

        <input id="name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}></input>


        <button onClick={setAccountName}>Save</button>

        </div>

        </div>


            


<div className="adopters-account-label-space">

<label htmlFor="email">

            Email
        </label>


          <div className="adopters-account-email-button-space">

        <input id="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}></input>

        <button onClick={setAccountEmail}>Save</button>

        </div>


</div>


</div>

 </div>



</div>



<div className="adopters-account-security">


<h2 className="adopters-account-security-title">Security</h2>

<div className="adopters-account-security-button-space">


<label htmlFor="change_password" className="adopter-account-change-label">

    Change Password
</label>



<div className="adopters-account-security-button-space-inside">
<input

id="change_password"
placeholder="Current Password"
type="password"
name="current password"
value={old_password}
onChange={(e) => setOld_Password(e.target.value)}></input>

<input
placeholder="New Password"
type="password"
value={new_password}
onChange={(e) => setNew_Password(e.target.value)}
name="password"></input>


<input
placeholder="Confirm Password"
type="password"
value={confirm_password}
onChange={(e) => setConfirm_Password(e.target.value)}
name="confirm_password"></input>

<button onClick={handleChangePassword}> Update Password</button>


</div>

</div>




</div>


<div className="adopters-account-delete">


    <h2 className="adopters-account-danger-zone-title">Danger Zone</h2>
    


    <button onClick={() =>setShowModal(true)}>Delete Account</button>
</div>


   


{showModal === true ?(

     <div className="delete-modal-overlay">


<div className="delete-modal">

    <div className="delete-modal-icon-container">

    <FaExclamationTriangle className="delete-modal-icon"/>

    </div>

<p>Are you sure that you want to delete this user?
    This action cannot be undone.
</p>

<div className="delete-modal-button-container">
<button className="delete-modal-cancel" onClick={() => setShowModal(false)}> Cancel</button>
<button className="delete-modal-delete" onClick={handleDelete}> Delete</button>
</div>

    
</div>
</div>

): null}


</div>

        </div>


</div>

        </div>
    )


}