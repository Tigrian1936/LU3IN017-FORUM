import { useState } from 'react'
import ClickableUserProfile from './ClickableUserProfile';
import Logout from './Logout';

function ConnectedUserRedirection (props) {
    const setDisplay = props.setDisplay;
    const setDisplayDataId = props.setDisplayDataId;
    return (
        <div>
            <ClickableUserProfile user = {props.user} setDisplay ={setDisplay} setDisplayDataId = {setDisplayDataId}/>
            <Logout logOut = {props.logOut}/>
        </div>
    );
}

export default ConnectedUserRedirection;