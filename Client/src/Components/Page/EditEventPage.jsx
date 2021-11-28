import React from 'react'
import './AddEvent.css'
import {useRef} from "react"
import {useState} from "react";
import Axios from "axios"
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';

import {useHistory} from "react-router-dom"


function EditEventPage() {


    const location = useLocation();

    const [event,setEvent] = useState({});


    const AboutEventRef = useRef();
        const EventNameRef = useRef();
        const EventDateRef = useRef();
        const EventStartTimeRef = useRef();
        const EventEndTimeRef = useRef();

        let history = useHistory();


        useEffect(() =>{

            Axios({
                method: "GET",
                
                withCredentials: true,
                url: "http://localhost:3000/EditForm/?id="+location.state,
              }).then((response) =>{
              
                      return response.data
                      
                  })
              .then(data =>{
                console.log(data)
                console.log(data.event)
                setEvent(data.event)
                console.log("yahan")
                // console.log(displayBlogs)
                  //     // console.log(data)
                  });
        },[])




    function submitHandler(e) {

        

        e.preventDefault();


        

        // console.log(form_data);

        // for (var key of form_data.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
        
        const eneteredAboutEvents =AboutEventRef.current.value;
        const enteredEventName = EventNameRef.current.value;
        const enteredEventDate = EventDateRef.current.value;
        const enteredStartTime = EventStartTimeRef.current.value;
        const enteredEndTime = EventEndTimeRef.current.value;


        var form_data = new FormData();

        const inpfiles = document.getElementById('multiFiles')
        form_data.append("eventbanner",inpfiles.files[0]);
        form_data.append('eventname',enteredEventName)
            form_data.append('aboutevent',eneteredAboutEvents)
            form_data.append('eventStartTime',enteredStartTime)
            form_data.append('eventEndTime',enteredEndTime)
            form_data.append('eventDate',enteredEventDate)

            


        Axios({
            method: "POST",
             
            data:form_data,
            headers: { "Content-Type": "multipart/form-data" },
            
            withCredentials: true,
            url: "http://localhost:3000/UpdateEvent",
          }).then(res => {
            console.log(res);
            history.push("/UpcomingEvent")
            
            
        }).catch(err => {
            console.log(err);
            console.log("main nhi chal rha hoon bhai")
        });


    }
    







    return (
        <div>
            <div className="main-wrap">
                <div className="outer-wrap">
                    <h1>Add Event</h1>
                    <hr />
                    
                    <form onSubmit={submitHandler} className="register-form" enctype="multipart/form-data">
                        
                        <label htmlFor="Banner">Banner</label><br />
                        <input type="file"  className='user' style={{borderStyle:"none"}} id="multiFiles" /><br />

                        <label htmlFor="About Event">About Event</label><br />
                        <input type="text" ref={AboutEventRef} value={event.aboutevent}  className='email' /><br />

                        <label htmlFor="Event Name" >Event Name</label><br />
                        <input type="text" ref={EventNameRef}   value={event.eventname}  className='pass' /><br />

                        <label htmlFor="Event Date" >Event Date</label><br />
                        <input type="text" ref={EventDateRef}  value={event.eventDate}  className='Codeforces'  /><br />

                        <label htmlFor="Start Time">Start Time</label><br />
                        <input type="text" ref={EventStartTimeRef}  value={event.eventStartTime}  className='Cdchef' /><br />

                        <label htmlFor="End Time" name=''>End Time</label><br />
                        <input type="text" ref={EventEndTimeRef}  value={event.eventEndTime}  className='hckrnk'  /><br />

                        <button type='submit' className="register-btn">Add Event</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditEventPage
