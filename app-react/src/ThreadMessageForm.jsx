import React from 'react';
import { useState } from 'react';

import photo from "./assets/react.svg"; 

function ThreadMessageForm(props){
  const [message, setMessage] = useState('');

  const handeSubmitNewMessage = event =>{
    event.preventDefault();
    axios.post(`${GetUrl()}/threads/:${props.id}/add`, {
      message: message
  })
  .then((response) =>{
      if(response.status === 200)
      {
        props.setUpToDate(true);
      }
      else{
          console.log(response.message);
      }
    })
  .catch(err => {
      console.error(err);
  });
  }

  return (
  <div>
    <label htmlFor="new-message-label">Nouveau Message</label>
    <input id="new-message" value={message} onChange={evt=>setMessage(evt.target.value)}/> 
    <button type="submit" name="publish-button" onClick={handeSubmitNewMessage}>Publier</button>        
  </div>);
}

export default ThreadMessageForm;