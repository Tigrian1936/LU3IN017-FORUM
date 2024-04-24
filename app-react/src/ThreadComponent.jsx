import React from 'react';
import MessageList from './MessageList';
import ThreadMessageForm from './ThreadMessageForm';

import { useState } from 'react';
function ThreadComponent(props){

  const getMessagesFromDB = () =>{
    axios.get(`${GetUrl()}/threads/:${props.id}`).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      else {
        console.log(response.message);
      }
    }).catch(err => {
      console.error(err);
    });
    return null;
  }

  const setMessagesForClient = () =>{
    const messageList = getMessagesFromDB();
    if(messageList != null){
      setMessages(messageList)
    }
    else{
      console.log(`Error while  accessing messages of thread (id : ${props.id}). Check console for errors`)
    }
  }

  const [messages, setMessages] = useState(null);
  return (
  <div className="thread">
    <MessageList messages = {messages} displayData = {props.displayData}/>
    <ThreadMessageForm id = {props.id} onSuccesfulAdd = {set}/>
  </div>);
}

export default ThreadComponent;
