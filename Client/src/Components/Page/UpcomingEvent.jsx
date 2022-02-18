import './UpcomingEvent.css';
import FormTable from '../Images/FormTable.svg';
import Axios from 'axios';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Service/auth-context';
import Card from '@mui/material/Card';
import CircularIndeterminate from '../Layout/CircularIndeterminate';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import GroupsIcon from '@mui/icons-material/Groups';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

function UpcomingEvent() {
  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;

  const [isLoading, setIsLoading] = useState(true);
  const [eve, setEve] = useState([]);

  useEffect(() => {
    // axios.get('http://localhost:3000/UpcomingEvents')
    // .then(response => {
    //     return response.data
    // }).then(data =>{
    //     console.log(data)
    //     setEve(data.data.events)

    // });

    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/UpcomingEvents',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setEve(data.data.events);
        //     // console.log(data)
      });
  }, []);

  const eventHandler = (apiId) => {
    apiId.preventDefault();

    Axios({
      method: 'GET',

      withCredentials: true,
      url:
        'http://localhost:3000/RegisterForEvent/?id=' +
        apiId.target.id +
        '&userid=' +
        userId,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        document.getElementById(apiId.target.id).style.background = 'green';
        document.getElementById(apiId.target.id).innerHTML = 'Registered';
        alert('Registration Successfull');
      });
  };

  const deleteEventHandler = (del) => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/DeleteEvent/?id=' + del.target.id,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        // setDiscuss(...Discuss,data)
        document.getElementById('event-' + del.target.id).remove();
      });
  };

  const renderButton = (data) => {
    if (data.Registeredusers.includes(userId)) {
      return (
        <button
          style={{ background: 'green' }}
          id={data._id}
          className='event-btn btn-event'
        >
          Registered
        </button>
      );
    } else {
      return (
        <button
          onClick={eventHandler}
          id={data._id}
          className='event-btn btn-event'
        >
          Register
        </button>
      );
    }
  };

  // const UpcomingEventsRendering = () => {
  //   if (isLoading) {
  //     return <CircularIndeterminate />;
  //   } else {
  //     return (
  //       <div>
  //         <div className='divEventButton'>
  //           <Link to='/AddEvent'>
  //             <button className='eventAddButton'>Add Event</button>
  //           </Link>
  //         </div>
  //         {eve.map((data) => {
  //           return (
  //             <div id={'event-' + data._id} className='event-box'>
  //               <div className='event-banner' key={data._id}>
  //                 <div className='events-imagebox'>
  //                   <img
  //                     className='image-img'
  //                     src={'http://localhost:3000' + data.eventbanner}
  //                   />
  //                 </div>
  //                 <div className='events-contentBox'>
  //                   <h2>{data.eventname}</h2>
  //                   <p>
  //                     <span>Date:{data.eventDate} </span>
  //                     <div>
  //                       Timing: ({data.eventStartTime} - {data.eventEndTime})
  //                     </div>
  //                     <div>
  //                       Registered Users : {data.Registeredusers.length}
  //                     </div>
  //                   </p>
  //                   {renderButton(data)}
  //                   <button
  //                     style={{
  //                       marginLeft: '10px',
  //                       width: '90px',
  //                       height: '5.8vh',
  //                       borderRadius: '7px',
  //                       borderStyle: 'none',
  //                       background: 'rgb(219, 49, 49)',
  //                       color: 'white',
  //                     }}
  //                     onClick={deleteEventHandler}
  //                     id={data._id}
  //                   >
  //                     Delete
  //                   </button>
  //                   {/* <Link to={{ pathname: '/EditEventPage', state: data._id }}>
  //                 <button>Edit</button>
  //               </Link> */}
  //                 </div>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     );
  //   }
  // };

  return (
    <div>
      {/* // UpcomingEventsRendering() */}
      <div className='body-EventsBox'>
        <div className='upcomingEventOuterBox'>
          <div className='upcomingEventInnerBox'>
            <div style={{ width: '100%', marginTop: '1rem' }}>
              <Card
                sx={{ width: '100%', padding: '30px', borderRadius: '20px' }}
              >
                <div className='events-List-Container'>
                  <div className='events-First-Section-Container'>
                    <div className='first-Vertical-Line'></div>
                    <div>STARTS ON</div>
                    <div style={{ marginTop: '20px' }}>18</div>
                    <div>FEBRUARY</div>
                  </div>
                  <div className='events-Second-Container'>
                    <div className='events-Heading'>
                      <u>UPCOMING EVENTS HEADING</u>
                    </div>
                    {/* <div className='<div className='events-Contest-Time-Divider'></div>'></div> */}
                    <div style={{ marginTop: '20px', fontWeight: '500' }}>
                      CONTEST
                      <span className='events-Contest-Time-Divider'></span>
                      <span style={{ marginLeft: '2rem' }}>
                        <AccessTimeFilledIcon /> 08:00 PM IST
                      </span>
                    </div>
                  </div>
                  <div className='events-Third-Container'>
                    <div className='events-Registered-Count'>
                      <GroupsIcon style={{ fontSize: '40px' }} />{' '}
                      <span
                        style={{
                          paddingTop: '8px',
                          marginLeft: '1rem',
                          fontWeight: '500',
                        }}
                      >
                        4500
                      </span>
                    </div>
                    <div className='event-Delete-Edit-Share'>
                      <div className='events-Edit-Btn'>
                        <EditIcon
                          style={{ fontSize: '30px', color: 'green' }}
                        />
                      </div>
                      <div className='events-Delete-Btn'>
                        <DeleteIcon
                          style={{
                            fontSize: '30px',
                            marginLeft: '1rem',
                            color: 'red',
                          }}
                        />
                      </div>
                      <div className='events-Share-Btn'>
                        <ReplyIcon
                          style={{
                            fontSize: '30px',
                            marginLeft: '1rem',
                            color: 'blue',
                          }}
                        />
                      </div>
                    </div>
                    <div className='events-Register-Btn'>
                      REGISTER HERE
                      <span>
                        <ArrowForwardIcon style={{ marginLeft: '1rem' }} />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpcomingEvent;
