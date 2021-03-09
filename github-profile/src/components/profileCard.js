//TECH IMPORTS 
import React from "react";

//STYLING IMPORTS
import "../index.css";


export default function ProfileCard (props){

    const { myProfile }=props;

    return (
        <div className="profileCardMainDiv">
            <h2>{myProfile.login}</h2>
            <a href={myProfile.html_url}>Link to Github</a>
            <img src={myProfile.avatar_url} alt="selfie from github profile" />
            <p>Followers: {myProfile.followers} </p>
            <p>Following: {myProfile.following} </p>
        </div>
    )
}