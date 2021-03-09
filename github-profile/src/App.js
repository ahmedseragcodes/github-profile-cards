//TECH IMPORTS 
import React from "react";
import axios from "axios";
//STYLING IMPORTS 
import "./index.css";
//COMPONENT IMPORTS
import ProfileCard from "./components/profileCard";
import { BASE_URL, API_KEY } from "./constants/constants";
import FriendsProfileCard from "./components/friendsProfileCard";

class App extends React.Component {
  state={
    myProfile: [],
    friends: [],
  }

  //LOADS MY PROFILE INFORMATION UPON MOUNT
  componentDidMount(){
    axios.get(`${BASE_URL}/${API_KEY}`)
      .then((res)=>{
        console.log("APP COMP, SUCCEEDED GETTING MY PROFILE INFO", res);
        this.setState({
          ...this.state, myProfile: res.data
        })
      })
      .catch((err)=>{
        console.log("APP COMP, FAILED GETTING MY PROFILE INFO", err);
      })
  }

  //ALERTS WHEN MY PROFILE GETS A NEW FOLLOWER VIA COMPONENT DID UPDATE AND PREVIOUS STATE, COMMENTED OUT FOR NOW
  // componentDidUpdate(prevProps, prevState){
  //   if (prevState.friends.length < this.state.friends.length){
  //     alert("You've got a new follower(s) on Github!")
  //   }
  // }

  //HELPER FUNCTION GETTING PASSED TO FRIENDS COMPONENT, FOR SETTING FRIENDS STATE
  setFriends=(friendsData)=>{
    this.setState({
      ...this.state, friends: friendsData
    })
  }

  render(){
    return (
      <div className="catchAllContainer">
        <h1>@AhmedSeragCodes On Github</h1>
        <ProfileCard myProfile={this.state.myProfile} />
        <h2>My Github Friends</h2>
        <FriendsProfileCard friends={this.state.friends} setFriends={this.setFriends} myProfile={this.state.myProfile}/>
      </div>
    )
  }

}
export default App;
