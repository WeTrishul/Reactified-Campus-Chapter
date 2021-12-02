import React from 'react';
import './AddEvent.css';
import { useRef } from 'react';
import Axios from 'axios';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Service/auth-context';

function AddEvent({ socket }) {
  const authCtx = useContext(AuthContext);
  let userName = authCtx.username;

  // const [eventData,setEventData] = useState({})

  const AboutEventRef = useRef();
  const EventNameRef = useRef();
  const EventDateRef = useRef();
  const EventStartTimeRef = useRef();
  const EventEndTimeRef = useRef();

  let history = useHistory();

  function submitHandler(e) {
    e.preventDefault();

    // console.log(form_data);

    // for (var key of form_data.entries()) {
    //     console.log(key[0] + ', ' + key[1]);
    // }

    const eneteredAboutEvents = AboutEventRef.current.value;
    const enteredEventName = EventNameRef.current.value;
    const enteredEventDate = EventDateRef.current.value;
    const enteredStartTime = EventStartTimeRef.current.value;
    const enteredEndTime = EventEndTimeRef.current.value;

    var form_data = new FormData();

    const inpfiles = document.getElementById('multiFiles');
    form_data.append('eventbanner', inpfiles.files[0]);
    form_data.append('eventname', enteredEventName);
    form_data.append('aboutevent', eneteredAboutEvents);
    form_data.append('eventStartTime', enteredStartTime);
    form_data.append('eventEndTime', enteredEndTime);
    form_data.append('eventDate', enteredEventDate);

    Axios({
      method: 'POST',

      data: form_data,
      headers: { 'Content-Type': 'multipart/form-data' },

      withCredentials: true,
      url: 'http://localhost:3000/CreateEvent',
    })
      .then((res) => {
        console.log(res);
        socket.emit('notify', {
          to: undefined,
          from: userName,
          msg:
            'event: ' +
            res.data.data.eventname +
            ' on ' +
            res.data.data.eventdate,
          placetogo: '/U',
        });
        history.push('/UpcomingEvent');
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  }

  return (
    <div>
      <div className='main-wrap'>
        <div className='outer-wrap'>
          <h1>Add Event</h1>
          <hr />

          <form
            onSubmit={submitHandler}
            className='register-form'
            enctype='multipart/form-data'
          >
            <label htmlFor='Banner'>Banner</label>
            <br />
            <input
              type='file'
              name='eventbanner'
              className='user'
              style={{ borderStyle: 'none' }}
              id='multiFiles'
            />
            <br />

            <label htmlFor='About Event'>About Event</label>
            <br />
            <input
              type='text'
              ref={AboutEventRef}
              className='email'
              placeholder='About Event'
            />
            <br />

            <label htmlFor='Event Name'>Event Name</label>
            <br />
            <input
              type='text'
              ref={EventNameRef}
              name='pass'
              className='pass'
              placeholder='Event Name'
            />
            <br />

            <label htmlFor='Event Date'>Event Date</label>
            <br />
            <input
              type='text'
              ref={EventDateRef}
              name='cdfrce'
              className='Codeforces'
              placeholder='Event Date'
            />
            <br />

            <label htmlFor='Start Time'>Start Time</label>
            <br />
            <input
              type='text'
              ref={EventStartTimeRef}
              name='cdchef'
              className='Cdchef'
              placeholder='Start Time'
            />
            <br />

            <label htmlFor='End Time' name=''>
              End Time
            </label>
            <br />
            <input
              type='text'
              ref={EventEndTimeRef}
              name='hckrnk'
              className='hckrnk'
              placeholder='End Time'
            />
            <br />

            <button type='submit' className='register-btn'>
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
