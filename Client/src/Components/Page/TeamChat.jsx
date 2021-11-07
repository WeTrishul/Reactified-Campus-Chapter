import React from 'react'
import {useState} from 'react';
import { Redirect } from 'react-router-dom';


function TeamChat() {

    const [ExecutiveButton,setExecutiveButton]=useState(false);
    const [CoreButton,setCoreButton]=useState(false)

    if(CoreButton)
    {
        return <Redirect to='/CoreChat'/>
    }
    if(ExecutiveButton)
    {
        return <Redirect to='/ExecutiveChat'/>
    }
    return (
        <div>
            <h1>Talk to your team</h1>
            <button onClick={()=>setExecutiveButton(true)}>Executive Team</button>
            <button onClick={() =>setCoreButton(true)}>Core Team</button>
        </div>

        

    )
}

export default TeamChat
