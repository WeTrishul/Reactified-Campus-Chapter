import React from 'react'
import './EventForm.css'
import {useState} from 'react';
import { Redirect } from 'react-router-dom';

function EventForm() {

    const [submitOn, setSubmitOn]=useState(false);
    if(submitOn)
    {
        return <Redirect to='/UpcomingEvent'/>
    }
    return (
        <div>
            <div className="form-box">
                <div className="heading">
                    <h2 className="heading-style">
                        Event Form:
                    </h2>
                </div>
                <form  className="input">
                <input type="file" className='field' required />
                    <input type="text" className='field' placeholder='Event Name' required/>
                    <input type="text" className='field' placeholder='About Event' required />
                    <input type="text" className='field' placeholder='Start Time' required/>
                    <input type="text" className='field' placeholder='End Time' required />
                    <input type="text" className='field' placeholder='Event Date' required />
                    <button className='submit-btn' onClick={() => setSubmitOn(true)}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EventForm
