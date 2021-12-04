import './UpcomingEvent.css';
import FormTable from '../Images/FormTable.svg';
import Axios from 'axios';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Service/auth-context';
import CircularIndeterminate from '../Layout/CircularIndeterminate';

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

  const UpcomingEventsRendering = () => {
    if (isLoading) {
      return <CircularIndeterminate />;
    } else {
      return (
        <div>
          <div className='divEventButton'>
            <Link to='/AddEvent'>
              <button className='eventAddButton'>Add Event</button>
            </Link>
          </div>
          {eve.map((data) => {
            return (
              <div id={'event-' + data._id} className='event-box'>
                <div className='event-banner' key={data._id}>
                  <div className='events-imagebox'>
                    <img
                      className='image-img'
                      src={'http://localhost:3000' + data.eventbanner}
                    />
                  </div>
                  <div className='events-contentBox'>
                    <h2>{data.eventname}</h2>
                    <p>
                      {data.eventDate}
                      {data.eventStartTime}
                      {data.eventEndTime}
                      <div>
                        Registered Users : {data.Registeredusers.length}
                      </div>
                    </p>
                    {renderButton(data)}
                    <button onClick={deleteEventHandler} id={data._id}>
                      Delete
                    </button>
                    {/* <Link to={{ pathname: '/EditEventPage', state: data._id }}>
                  <button>Edit</button>
                </Link> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return <>{UpcomingEventsRendering()}</>;
}

export default UpcomingEvent;
