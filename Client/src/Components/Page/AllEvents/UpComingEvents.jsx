import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useRef } from 'react';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../../../Service/auth-context';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from 'react-router-dom';
import './Events.css';

const style = {
  position: 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  height: '510px',
  boxShadow: 24,
  p: 4,
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  borderRadius: '20px',
  color: theme.palette.text.secondary,
}));

function UpComingEvents({ socket }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [event, setEditEvent] = useState();

  // for edit event modal form

  const [editopen, setEditOpen] = React.useState(false);
  const handleEditOpen = (eveid) => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/EditForm/?id=' + eveid,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        console.log(data.event);
        setEditEvent(data.event);
        console.log('yahan');
      });

    if (event) {
      console.log(event);
      setEditOpen(true);
    }
  };

  const handleEditClose = () => setEditOpen(false);

  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;
  let userName = authCtx.username;

  const AboutEventRef = useRef();
  const EventNameRef = useRef();
  const EventDateRef = useRef();
  const EventStartTimeRef = useRef();
  const EventEndTimeRef = useRef();

  let history = useHistory();

  function submitHandler(e) {
    e.preventDefault();

    // console.log(form_data);

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

    for (var key of form_data.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    Axios({
      method: 'POST',

      data: form_data,
      headers: { 'Content-Type': 'multipart/form-data' },

      withCredentials: true,
      url: 'http://localhost:3000/CreateEvent',
    })
      .then((res) => {
        console.log(res.data.data);
        socket.emit('notify', {
          to: undefined,
          from: userName,
          msg:
            'event: ' +
            res.data.data.eventname +
            ' on ' +
            res.data.data.eventdate,
          placetogo: '/UpcomingEvent/' + '#event-' + res.data.data.eventid,
        });
        // setEve(eve => [ ...eve, res.data.data ]);
        setOpen(false);
        history.push('/Dashboard');
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  }

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
    // apiId.preventDefault();

    Axios({
      method: 'GET',

      withCredentials: true,
      url:
        'http://localhost:3000/RegisterForEvent/?id=' +
        apiId +
        '&userid=' +
        userId,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        document.getElementById('regbtn' + apiId).style.background = 'red';
        document.getElementById('regbtn' + apiId).innerHTML = 'Registered';
        var c = parseInt(document.getElementById('regno' + apiId).innerHTML);
        c += 1;
        document.getElementById('regno' + apiId).innerHTML = c;
        alert('Registration Successfull');
      });
  };

  const deleteEventHandler = (del) => {
    Axios({
      method: 'GET',

      withCredentials: true,
      url: 'http://localhost:3000/DeleteEvent/?id=' + del,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        // setDiscuss(...Discuss,data)
        document.getElementById('event-' + del).remove();
      });
  };

  const renderButton = (data) => {
    if (data.Registeredusers.includes(userId)) {
      return (
        <Button variant='contained' color='error' id={'regbtn' + data._id}>
          Registered
        </Button>
      );
    } else {
      return (
        <Button
          variant='contained'
          color='success'
          onClick={() => eventHandler(data._id)}
          id={'regbtn' + data._id}
        >
          Register
        </Button>
      );
    }
  };

  const renderPriviledgeButton = (data) => {
    if (1) {
      return (
        <Box sx={{ display: 'flex' }}>
          <Box>
            <EditIcon onClick={() => handleEditOpen(data._id)} />
          </Box>
          <Box sx={{ marginLeft: '20px' }}>
            <DeleteIcon
              onClick={() => deleteEventHandler(data._id)}
              id={data._id}
            />
          </Box>
          <Box sx={{ marginLeft: '20px' }}>
            <ReplyIcon />
          </Box>
        </Box>
      );
    } else {
      return <div></div>;
    }
  };

  function editHandler() {
    // e.preventDefault();

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
      url: 'http://localhost:3000/UpdateEvent',
    })
      .then((res) => {
        console.log(res);
        history.push('/UpcomingEvent');
      })
      .catch((err) => {
        console.log(err);
        console.log('main nhi chal rha hoon bhai');
      });
  }

  const eventsRenderingOnWidth = (data) => {
    if (window.innerWidth <= 431) {
      return (
        <Box>
          <Box>
            <Box sx={{ width: 1 }}>
              <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
                <Box gridColumn='span 12'>
                  <Item sx={{ height: '70vh' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Box>
                        <GroupsIcon sx={{ fontSize: '30px' }} />
                      </Box>
                      <Box sx={{ marginLeft: '2px' }}>
                        <span id={'regno' + data._id}>
                          {data.Registeredusers.length}
                        </span>
                      </Box>
                      <Box sx={{ display: 'flex', marginLeft: '60px' }}>
                        <Box>
                          <EditIcon />
                        </Box>
                        <Box sx={{ marginLeft: '20px' }}>
                          <DeleteIcon />
                        </Box>
                        <Box sx={{ marginLeft: '20px' }}>
                          <ReplyIcon />
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '200px',
                          borderRadius: '20px',
                        }}
                        src={'http://localhost:3000' + data.eventbanner}
                        alt=''
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontWeight: '600', fontSize: '15px' }}
                        variant='h7'
                      >
                        {data.eventname}
                      </Typography>
                    </Box>
                    <Box sx={{ fontSize: '10px' }}>
                      College Event |{' '}
                      <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />{' '}
                      {data.eventStartTime} - {data.eventEndTime}
                    </Box>
                    <Box
                      sx={{
                        marginTop: '20px',
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {renderButton(data)}
                    </Box>
                  </Item>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (window.innerWidth >= 431 && window.innerWidth < 768) {
      return (
        <Box>
          <Box sx={{ width: 1, marginTop: '1rem' }}>
            <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
              <Box gridColumn='span 12'>
                <Item sx={{ height: '30vh' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ maxWidth: '30%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '140px',
                          borderRadius: '20px',
                        }}
                        src={'http://localhost:3000' + data.eventbanner}
                        alt=''
                      />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                      <Box sx={{ marginLeft: '20px' }}>
                        <Box>
                          <Typography sx={{ fontWeight: '600' }} variant='h7'>
                            {data.eventname}
                          </Typography>
                        </Box>
                        <Box>
                          College Event |{' '}
                          <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />{' '}
                          {data.eventStartTime} - {data.eventEndTime}
                        </Box>

                        <Box sx={{ marginTop: '5px' }}>
                          <Box>On {data.eventDate} </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ marginLeft: '20px' }}>
                      <Box sx={{ display: 'flex', marginLeft: '30px' }}>
                        <Box>
                          <GroupsIcon sx={{ fontSize: '30px' }} />
                        </Box>
                        <Box sx={{ marginLeft: '2px' }}>
                          <span id={'regno' + data._id}>
                            {data.Registeredusers.length}
                          </span>
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        {/* yahan se uthaya */}

                        {renderPriviledgeButton(data)}
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>{renderButton(data)}</Box>
                    </Box>
                  </Box>
                </Item>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (window.innerWidth >= 768 && window.innerWidth < 1000) {
      return (
        <Box>
          <Box sx={{ width: 1, marginTop: '1rem' }}>
            <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
              <Box gridColumn='span 12'>
                <Item sx={{ height: '30vh' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ maxWidth: '30%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '140px',
                          borderRadius: '20px',
                        }}
                        src={'http://localhost:3000' + data.eventbanner}
                        alt=''
                      />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                      <Box sx={{ marginLeft: '20px' }}>
                        <Box>
                          <Typography sx={{ fontWeight: '600' }} variant='h6'>
                            {data.eventname}
                          </Typography>
                        </Box>
                        <Box>
                          COLLEGE EVENT |{' '}
                          <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />{' '}
                          {data.eventStartTime} - {data.eventEndTime}
                        </Box>

                        <Box sx={{ marginTop: '10px' }}>
                          <Box>
                            On {data.eventDate}{' '}
                            <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />
                            {data.eventStartTime} - {data.eventEndTime}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ marginLeft: '20px' }}>
                      <Box sx={{ display: 'flex', marginLeft: '30px' }}>
                        <Box>
                          <GroupsIcon sx={{ fontSize: '30px' }} />
                        </Box>
                        <Box sx={{ marginLeft: '2px' }}>
                          <span id={'regno' + data._id}>
                            {data.Registeredusers.length}
                          </span>
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        {renderPriviledgeButton(data)}
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>{renderButton(data)}</Box>
                    </Box>
                  </Box>
                </Item>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (window.innerWidth > 1000) {
      return (
        <Box>
          <Box sx={{ width: 1, marginTop: '1rem' }}>
            <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gap={2}>
              <Box gridColumn='span 12'>
                <Item sx={{ height: '30vh' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ maxWidth: '20%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '165px',
                          borderRadius: '20px',
                        }}
                        src={'http://localhost:3000' + data.eventbanner}
                        alt=''
                      />
                    </Box>
                    <Box sx={{ width: '60%' }}>
                      <Box sx={{ marginLeft: '20px' }}>
                        <Box>
                          <Typography sx={{ fontWeight: '600' }} variant='h6'>
                            {data.eventname}
                          </Typography>
                        </Box>
                        <Box>
                          COLLEGE EVENT |{' '}
                          <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />{' '}
                          {data.eventStartTime} - {data.eventEndTime}
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>{data.aboutevent}</Box>
                        <Box sx={{ marginTop: '5px' }}>
                          <Box>
                            On {data.eventDate}{' '}
                            <AccessTimeFilledIcon sx={{ paddingTop: '8px' }} />
                            {data.eventStartTime} - {data.eventEndTime}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ marginLeft: '20px' }}>
                      <Box sx={{ display: 'flex', marginLeft: '30px' }}>
                        <Box>
                          <GroupsIcon sx={{ fontSize: '30px' }} />
                        </Box>
                        <Box sx={{ marginLeft: '2px' }}>
                          <span id={'regno' + data._id}>
                            {data.Registeredusers.length}
                          </span>
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>
                        {renderPriviledgeButton(data)}
                      </Box>
                      <Box sx={{ marginTop: '20px' }}>{renderButton(data)}</Box>
                    </Box>
                  </Box>
                </Item>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    }
  };
  return (
    <div>
      <div className='upComingEvents-Body-Box'>
        <div className='upComingEvents-Outer-Box'>
          <div className='upComingEvents-Inner-Box'>
            <div>
              {eve.map((data) => {
                return (
                  <div id={'event-' + data._id} key={data._id}>
                    {eventsRenderingOnWidth(data)}
                  </div>
                );
              })}

              {/* <Button onClick={handleOpen}>Open modal</Button> */}
              <form onSubmit={submitHandler} enctype='multipart/form-data'>
                <Modal
                  aria-labelledby='transition-modal-title'
                  aria-describedby='transition-modal-description'
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <Box
                        sx={{
                          width: '100%',
                          textAlign: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          sx={{ width: '100%' }}
                          id='transition-modal-title'
                          variant='h5'
                          component='h2'
                        >
                          ADD EVENT FORM
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: '100%',
                          textAlign: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          id='transition-modal-description'
                          sx={{ mt: 2 }}
                        >
                          <Box sx={{ marginTop: '10px' }}>
                            <Button variant='contained' component='label'>
                              Upload File
                              <input
                                type='file'
                                name='eventbanner'
                                id='multiFiles'
                                hidden
                              />
                            </Button>
                          </Box>
                          <Box sx={{ marginTop: '10px' }}>
                            <TextField
                              id='outlined-basic'
                              label='Event Name'
                              variant='outlined'
                              inputRef={EventNameRef}
                            />
                          </Box>
                          <Box sx={{ marginTop: '10px' }}>
                            <TextField
                              id='outlined-basic'
                              label='About Event'
                              variant='outlined'
                              inputRef={AboutEventRef}
                            />
                          </Box>
                          <Box sx={{ marginTop: '10px' }}>
                            <TextField
                              id='outlined-basic'
                              label='Start Time'
                              variant='outlined'
                              inputRef={EventStartTimeRef}
                            />
                          </Box>
                          <Box sx={{ marginTop: '10px' }}>
                            <TextField
                              id='outlined-basic'
                              label='End Time'
                              variant='outlined'
                              inputRef={EventEndTimeRef}
                            />
                          </Box>
                          <Box sx={{ marginTop: '10px' }}>
                            <TextField
                              id='outlined-basic'
                              label='Event Date'
                              variant='outlined'
                              inputRef={EventDateRef}
                            />
                          </Box>
                          <Box
                            sx={{
                              marginTop: '10px',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Button onClick={submitHandler} variant='contained'>
                              Submit
                            </Button>
                          </Box>
                        </Typography>
                      </Box>
                    </Box>
                  </Fade>
                </Modal>
              </form>
            </div>

            {/*================== Edit event modal form =============*/}

            {event && (
              <form onSubmit={submitHandler} enctype='multipart/form-data'>
                <Modal
                  aria-labelledby='transition-modal-title'
                  aria-describedby='transition-modal-description'
                  open={editopen}
                  onClose={handleEditClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={editopen}>
                    <Box sx={style}>
                      <Box
                        sx={{
                          width: '100%',
                          textAlign: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          sx={{ width: '100%' }}
                          id='transition-modal-title'
                          variant='h5'
                          component='h2'
                        >
                          Edit EVENT FORM
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: '100%',
                          textAlign: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          id='transition-modal-description'
                          sx={{ mt: 2 }}
                        >
                          <Box sx={{ marginTop: '10px' }}>
                            <Button variant='contained' component='label'>
                              Upload File
                              <input
                                type='file'
                                name='eventbanner'
                                id='multiFiles'
                                hidden
                              />
                            </Button>
                          </Box>
                          <Box sx={{ marginTop: '10px' }}>
                            <TextField
                              id='outlined-basic'
                              label='Event Name'
                              variant='outlined'
                              inputRef={EventNameRef}
                              value={event.eventname}
                              onChange={(event) => {
                                let x = event;
                                x.eventname = event.target.value;
                                setEditEvent(x);
                              }}
                            />
                          </Box>
                          <Box sx={{ marginTop: '10px' }}>
                            <TextField
                              id='outlined-basic'
                              label='About Event'
                              variant='outlined'
                              inputRef={AboutEventRef}
                              value={event.aboutevent}
                              onChange={(event) => {
                                let x = event;
                                x.aboutevent = event.target.value;
                                setEditEvent(x);
                              }}
                            />
                          </Box>
                          <Box sx={{ marginTop: '10px' }}>
                            <TextField
                              id='outlined-basic'
                              label='Start Time'
                              variant='outlined'
                              inputRef={EventStartTimeRef}
                              value={event.eventStartTime}
                              onChange={(event) => {
                                let x = event;
                                x.eventStartTime = event.target.value;
                                setEditEvent(x);
                              }}
                            />
                          </Box>
                          <Box sx={{ marginTop: '10px' }}>
                            <TextField
                              id='outlined-basic'
                              label='End Time'
                              variant='outlined'
                              inputRef={EventEndTimeRef}
                              value={event.eventEndTime}
                              onChange={(event) => {
                                let x = event;
                                x.eventEndTime = event.target.value;
                                setEditEvent(x);
                              }}
                            />
                          </Box>
                          <Box sx={{ marginTop: '10px' }}>
                            <TextField
                              id='outlined-basic'
                              label='Event Date'
                              variant='outlined'
                              inputRef={EventDateRef}
                              value={event.eventDate}
                              onChange={(event) => {
                                let x = event;
                                x.eventDate = event.target.value;
                                setEditEvent(x);
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              marginTop: '10px',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Button onClick={editHandler} variant='contained'>
                              Update
                            </Button>
                          </Box>
                        </Typography>
                      </Box>
                    </Box>
                  </Fade>
                </Modal>
              </form>
            )}

            {/*================== Edit event modal from =============*/}

            <button onClick={handleOpen} className='create-Events-Button'>
              <CreateIcon /> <span className='event-Create-btn'>Event</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpComingEvents;
//yessss bro
