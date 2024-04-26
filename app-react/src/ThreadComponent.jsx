import React from 'react';
import MessageList from './MessageList';
import ThreadMessageForm from './ThreadMessageForm';
import { useEffect } from 'react';
import axios from 'axios';
import GetUrl from './Url';
import { useState } from 'react';
function ThreadComponent(props){

  const setDisplay = props.setDisplay;
  const setDisplayDataId = props.setDisplayDataId;

  const [loading, setLoading] = useState(true);
  const [upToDate, setUpToDate] = useState(false);

  const getMessagesFromDB = () =>{
    axios.get(`${GetUrl()}/threads/${props.id}`).then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setMessages(response.data.messages)
      }
      else {
        console.log(response.message);
      }
    }).catch(err => {
      console.error(err);
    });
    return null;
  }

  useEffect(() => {
    getMessagesFromDB()
    setUpToDate(true)}, [upToDate]);
  

  const [messages, setMessages] = useState(null);
  if(loading){
    return (<div>Loading...</div>);
  }
  return (
  <div className="thread">
    <MessageList messages = {messages} setDisplay = {setDisplay} setDisplayDataId = {setDisplayDataId}/>
    <ThreadMessageForm id = {props.id} setUpToDate = {setUpToDate}/>
  </div>);
}

export default ThreadComponent;
