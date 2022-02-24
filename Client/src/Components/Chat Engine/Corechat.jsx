import React from 'react';
import './Chat.css';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../../Service/auth-context';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

function Corechat({ socket }) {
  socket.emit('leaveroom', 'corenotification');

  // const [ state, setState ] = useState({ message: "", name: "" })
  const [chat, setChat] = useState([]);
  const [noti, setNoti] = useState([]);

  const [value, setValue] = React.useState('Reason');

  const handleMultilineChange = (event) => {
    setValue(event.target.value);
  };
  const socketRef = useRef();
  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;

  let username = authCtx.username;
  console.log(authCtx.id);

  useEffect(() => {
    socket.emit('leaveroom', 'corenotification');

    socketRef.current = io.connect('http://localhost:5000');

    socketRef.current.on('connect', function () {
      console.log('connection established using sockets...!');

      socketRef.current.emit('join_room', {
        username: userId,
        chatroom: 'core',
        chatbox: '',
      });

      socketRef.current.on('user_joined', (data) => {
        console.log('user joined', data);
      });
    });

    // socketRef.current.on("message", ({ name, message }) => {
    //  setChat([ ...chat, { name, message } ])
    // })

    socketRef.current.on('old_messages', (data) => {
      setChat(data);
    });

    // socketRef.current.on('yesyoumaynotify',(data)=>{

    //     console.log('yes you may')

    // })

    return () => {
      // socket2.emit("join_room",{
      //     username:authCtx.id,
      //     chatroom:'corenotification',
      //     chatbox : ''
      //     });
      socket.emit('join_room', {
        username: authCtx.id,
        chatroom: 'corenotification',
        chatbox: '',
      });

      socketRef.current.disconnect();
    };
  }, []);

  // useEffect(()=>{

  // },[])

  const sendmsg = () => {
    var message = document.getElementById('message-input').value;
    //    console.log(message)
    if (message != '') {
      socketRef.current.emit('send_message', {
        message: message,
        username: userId,
        chatroom: 'core',
      });
      document.getElementById('message-input').value = '';
    }
  };
  useEffect(() => {
    socketRef.current.on('receive_message', (data) => {
      // setChat(data.message)

      // setChat([ ...chat, data ])
      setChat((chat) => [...chat, data]);
      console.log('Bol kya dikkat h');
      // console.log(chat)
      // if(userId==data.userid._id)
      // {
      //     document.getElementById('chatbody').append(data.message)
      // }
      // else{
      //     document.getElementById('chatbody').append(data.message);
      // }

      socket.emit('caninotifyothers', { data: data, room: 'core' });
    });
  }, []);

  const rendermessage = (data) => {
    if (data.userid._id == userId) {
      return (
        <Box>
          <Typography>
            <Box
              sx={{
                float: 'right',
                marginBottom: '5px',
                margoinTop: '5px',
                display: 'table',
                clear: 'both',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box
                  style={{
                    color: 'text.secondary',
                    marginRight: '7px',
                  }}
                >
                  <Card
                    sx={{
                      padding: '5px',
                      marginTop: '2px',
                      marginBottom: '2px',
                      borderRadius: '15px',
                      background: 'lightgreen',
                    }}
                  >
                    <Box sx={{ color: 'text.secondary' }}>
                      {data.userid.username}
                    </Box>
                    <Box
                      sx={{
                        color: 'text.primary',
                        whiteSpace: 'pre-wrap',
                        display: 'block',
                        width: '100%',
                      }}
                    >
                      <p>{data.message}</p>
                    </Box>
                    <Box
                      sx={{
                        float: 'right',
                        color: 'text.secondary',
                      }}
                    >
                      09:45
                    </Box>
                  </Card>
                </Box>
                <Box sx={{ color: 'text.secondary' }}>
                  <Avatar alt='demo' src={data.userid.dp} />
                </Box>
              </Box>
            </Box>
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box>
          <Typography>
            <Box
              sx={{
                marginBottom: '5px',
                margoinTop: '5px',
                display: 'Table',
                clear: 'both',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ color: 'text.secondary' }}>
                  <Avatar alt='demo' src={data.userid.dp} />
                </Box>
                <Box
                  style={{
                    color: 'text.secondary',
                    marginLeft: '7px',
                  }}
                >
                  <Card
                    sx={{
                      padding: '5px',
                      marginTop: '2px',
                      marginBottom: '2px',
                      borderRadius: '15px',
                      background: 'lightblue',
                    }}
                  >
                    <Box sx={{ color: 'text.secondary' }}>
                      {data.userid.username}
                    </Box>
                    <Box sx={{ color: 'text.primary' }}>{data.message}</Box>
                    <Box
                      sx={{
                        float: 'right',
                        color: 'text.secondary',
                      }}
                    >
                      09:45
                    </Box>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Typography>
        </Box>
      );
    }
  };

  return (
    <div>
      <div className='body-corechat-box'>
        <div className='corechat-outer-box'>
          <div className='corechat-inner-box'>
            <div className='chat-Container-Box'>
              <div className='chat-Page-Design'>
                <Card
                  style={{
                    width: '100%',
                    height: '70vh',
                    marginTop: '1rem',
                    borderTopLeftRadius: '25px',
                    borderBottomLeftRadius: '25px',
                    background: 'rgb(240, 199, 206)',
                    border: '1px solid black',
                    overflowY: 'auto',
                  }}
                >
                  <Box
                    sx={{
                      padding: '10px',
                      overflowY: 'auto',
                    }}
                  >
                    {/* yahan */}

                    {chat.map((data) => {
                      return rendermessage(data);
                    })}
                  </Box>
                </Card>
              </div>
              <div className='write-chat-Message'>
                <div style={{ width: '90%' }}>
                  <TextField
                    style={{ width: '100%' }}
                    id='message-input'
                    label='Enter your Text'
                    multiline
                    maxRows={4}
                    onChange={handleMultilineChange}
                  />
                </div>
                <div
                  style={{
                    width: '10%',
                    marginLeft: '20px',
                    paddingTop: '8px',
                  }}
                >
                  <SendIcon onClick={sendmsg} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Corechat;
