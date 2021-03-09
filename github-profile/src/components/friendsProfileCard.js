//TECH IMPORTS 
import axios from "axios";
import React, { useEffect, useState } from "react";
//STYLING IMPORTS
import "../index.css";
//COMPONENT IMPORTS 
import { FOLLOWERS_BASE_URL, MYFOLLOWERS_KEY } from "../constants/constants";

function FriendsProfileCard (props){

    //SETTING COMPONENT STATE FOR ENTRY FORM THAT CHANGES DISPLAYED FRIENDS BASED ON ENTRY
    const [loginEntry, setLoginEntry]=useState("");

    //PROP IMPORTS 
    const { friends, setFriends, myProfile }=props;

    //USES HELPER FUNCTION IMPORTED THROUGH PROPS TO SET FRIENDS RECEIVEd FROM API INTO STATE UPON COMPONENT MOUNT
    useEffect(()=>{
        axios.get(`${FOLLOWERS_BASE_URL}/${MYFOLLOWERS_KEY}`)
        .then((res)=>{
            console.log("FRIENDSPROFILECARD COMP, SUCCEEDED GETTING FRIENDS", res);
            setFriends(res.data);
        })
        .catch((err)=>{
            console.log("FRIENDSPROFILECARD COMP, FAILED GETTING FRIENDS", err);
        })
    },[myProfile, setFriends])

    const handleEntryFormChange = (event)=>{
        const {value}=event.target;
        setLoginEntry(value);
    }

    const handleEntryFormSubmit=(event)=>{
        event.preventDefault();
        axios.get(`${FOLLOWERS_BASE_URL}/${loginEntry}/followers`)
            .then((res)=>{
                console.log("FRIENDSPROFILECARD COMP, SUCCEEDED GETTING FRIENDS BASED ON ENTRY", res);
                setFriends(res.data);
            })
            .catch((err)=>{
                console.log("FRIENDSPROFILECARD COMP, FAILED GETTING FRIENDS BASED ON ENTRY", err);
            })
        
    }
  

 return (
     <div>
         <div className="loginEntryForm">
         <form onSubmit={handleEntryFormSubmit} >
             <label htmlFor="loginEntry">Enter A Username To Display Friends For:
                <input name="loginEntry" id="loginEntry" placeholder="Enter A Username" value={loginEntry} onChange={handleEntryFormChange} />
             </label>
             <button>Submit Username</button>
         </form>
         </div>
     <div className="friendsContainer">
         {friends.map((friend)=>{
             return (
                <div className="friendsProfileCard">
                <h2>{friend.login}</h2>
                <a href={friend.html_url}>Link to Github</a>
                <img src={friend.avatar_url} alt="selfie from github profile" />
                </div>
             )
         })}
     </div>
     </div>
 )   
}

export default FriendsProfileCard;