import React from 'react';
import { DisplayTypes } from './ForumBody';

function ClickableUserProfile (props){
  const OnClickProfile = event=>{
    props.setDisplay(DisplayTypes.PROFILE)
    props.setDisplayDataId(props.user.id)
  }

  return (<div className="messageProfile">
    <div className="message-Profile-details">
        <button className="user-id" onClick={OnClickProfile}>{props.user.username} </button> 
        <img src={props.user.photo}/>
    </div>  
  </div>);
}

export default ClickableUserProfile;