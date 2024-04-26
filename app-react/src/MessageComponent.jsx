import React from 'react';
import ClickableUserProfile from './ClickableUserProfile';
function MessageComponent (props){

  return (<div className="message">
    <ClickableUserProfile profile = {props.user} switchToProfile = {props.switchToProfile}/>
    <p>{props.text}</p>
    <div className="message-details">
      <span className="user-id">{props.user.username}</span> 
      <span className="message-date">{props.date}</span>  
      <span className="message-index">{props.index + 1}</span>
    </div> 
  </div>);
}

export default MessageComponent;