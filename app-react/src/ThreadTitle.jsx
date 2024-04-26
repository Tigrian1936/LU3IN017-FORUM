import React from 'react';
import ClickableUserProfile from './ClickableUserProfile';
import photo from "./assets/react.svg"
function ThreadTitle (props){
  return (<div className="thread-clickable-title">
     <button type="submit" onClick={evt=>props.switchToThread(props.threadId)}/>
  </div>);
}

export default ThreadTitle;