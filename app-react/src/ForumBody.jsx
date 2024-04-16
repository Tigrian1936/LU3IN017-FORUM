import React from 'react';
import ThreadComponent from './ThreadComponent';
import { useState } from 'react';
import UserProfile from './UserProfile';
import ThreadCreation from './ThreadCreation';

function ForumBody (props) {
  if(props.affichageCourant === "Thread"){
    return (<div className="forum-Body">
    <ThreadComponent messages = {props.pageData} addMessage = {props.addMessageToThread} displayData = {props.displayData}/>
  </div>);
  }
  if(props.affichageCourant === "Profile"){
      return (<div className="forum-Body">
      <UserProfile profile = {props.pageData.profile} messageList = {props.pageData.messageList} displayData = {props.displayData}/>
    </div>);
  }
  if(props.affichageCourant === "CreateThread"){
      return(<div>
        <ThreadCreation profile = {props.user} displayData = {props.displayData}/>
      </div>)
  }
}


export default ForumBody;