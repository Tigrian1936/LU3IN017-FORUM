import React from 'react';
import { useState, useEffect } from 'react';
import ForumBody from './ForumBody';
import photo from "./assets/react.svg"; 
import ClickableUserProfile from './ClickableUserProfile';
import Logout from './Logout';
import AuthentificationPage from './AuthentificationPage';
import ConnectedUserRedirection from './ConnectedUserRedirection';
import ThreadList from './ThreadList'
function ForumPage (props) {
  const [affichageCourant,setAffichageCourant] = useState(null)
  
  //Current Connected Profile
  const [user, setConnectedUser] = useState(null)

  //Affichage profile page
  const [pageData, setPageData] = useState(null) 

  const logIn = (profile)=>{
    setConnectedUser(profile)
  }

  const displayData = (affichage, data)=>{
    setAffichageCourant(affichage);
    setPageData(data);
  }

  const addMessageToThread = (message)=>{
    if(affichageCourant === "Thread"){
      setPageData([...pageData, message]);
    }
  }

  const switchToCreateThread = () =>{
    setAffichageCourant("CreateThread")
    setPageData(null)
  }

  const logOut = (evt)=>{
    setConnectedUser(null)
  }


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
            <button onClick={switchToCreateThread}>Create Thread</button>
          </div>
          <ForumBody affichageCourant = {affichageCourant} addMessageToThread = {addMessageToThread} pageData = {pageData} displayData = {displayData} user = {user}/>
        </div>
      </div>);
  }
  return(<AuthentificationPage logIn = {logIn}/>)

}

export default ForumPage;