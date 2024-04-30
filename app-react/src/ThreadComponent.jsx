import React from 'react';
import MessageList from './MessageList';
import ThreadMessageForm from './ThreadMessageForm';
import { useEffect } from 'react';
import axios from 'axios';
import GetUrl from './Url';
import { useState } from 'react';
function ThreadComponent(props){

  const LoadingStates = {
    LOADING : "Loading",
    LOADED : "Loaded",
    IDLE : "Idle",
  };

  const setDisplay = props.setDisplay;
  const setDisplayDataId = props.setDisplayDataId;

  const [loading, setLoading] = useState(LoadingStates.IDLE);
  const [upToDate, setUpToDate] = useState(false);

  const getMessagesFromDB = () =>{
    console.log(props.id);
    axios.get(`${GetUrl()}/threads/${props.id}`).then((response) => {
      if (response.status === 200) {
        setLoading(LoadingStates.LOADED);
        setMessages(response.data.messages)
        console.log(response.data.messages);
      }
      else {
        console.log(response.message);
      }
    }).catch(err => {
      setLoading(LoadingStates.IDLE);
      console.error(err);
    });
    return null;
  }

  useEffect(() => {
    setLoading(LoadingStates.LOADING);
    getMessagesFromDB()
    setUpToDate(false)}, [upToDate, props.id]);
  

  const [messages, setMessages] = useState(null);
  if(loading === LoadingStates.LOADING || loading === LoadingStates.IDLE){
    return (<div>Loading...</div>);
  }
  return (
  <div className="thread">
    <MessageList messages = {messages} setDisplay = {setDisplay} setDisplayDataId = {setDisplayDataId}/>
    <ThreadMessageForm user = {props.user} id = {props.id} setUpToDate = {setUpToDate}/>
  </div>);
}

export default ThreadComponent;
