import React from 'react';
import { useState, useEffect } from 'react';
import ForumBody from './ForumBody';
import photo from "./assets/react.svg"; 
import AuthentificationPage from './AuthentificationPage';
import ConnectedUserRedirection from './ConnectedUserRedirection';
import { DisplayTypes } from './ForumBody';


function ForumPage (props) {
  
  //Current Connected Profile
  const [user, setConnectedUser] = useState(null)

  const logIn = (profile)=>{
    setConnectedUser(profile)
  }

  const logOut = (evt)=>{
    setConnectedUser(null)
  }

  const [currentBodyDisplay,setDisplay] = useState({displayType :DisplayTypes.MAINPAGE, displayDataId : null})


  

  if(user != null){
    return (
      <div className="forum-page">
         <header>
          <div id="logo">
              <img src={photo} alt = "logo du site" height="75"/>
          </div>
          <div id="search">
            
          </div>
          <div id="connect">
              <ConnectedUserRedirection logOut = {logOut} displayData = {displayData} user = {user}/>
          </div>
         </header>
         <div>
          <div className="threads-recommandation">  
            <ThreadRecommendation user={user} query={RecommandationQueryType.MOSTRECENT} setDisplay = {setDisplay}/>
            <button onClick={switchToCreateThread}>Create Thread</button>
          </div>
          <ForumBody user = {user} display = {currentBodyDisplay} setDisplay = {bodyDisplayOverride}/>
        </div>
      </div>);
  }
  return(<AuthentificationPage logIn = {logIn}/>)

}

export default ForumPage;