import React from 'react';
import GetUrl from './Url';
import axios from 'axios';
function ThreadCreation(props){
  const createThread = ()=> {
    axios.post(`${GetUrl()}/threads/createThread`, {
            original_poster_id: props.profile.id,
            title: document.getElementById("title").value, 
            is_admin: props.profile.is_admin && document.getElementById("admin").checked
        })
        .then((response) =>{
            if(response.status === 200)
            {
              props.displayData("Thread", {})   
            }
            else{
                console.log(response.message);
            }
        })
        .catch(err => {
            console.error(err);
        });
  }
  if(props.profile.is_admin){
    return (<div className="thread-creation-fields">
    <label>Titre</label><input id="title"/>
    <toggle>Admin</toggle>
    <button onClick={createThread}> Create</button>      
  </div>);
  }
  else{
    return (<div className="thread-creation-fields">
    <label>Titre</label><input id="title"/>
    <button onClick={createThread}> Create</button>      
  </div>);
  }
  
}

export default ThreadCreation;
