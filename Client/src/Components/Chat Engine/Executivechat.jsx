import React from 'react';
import './Chat.css';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { useContext } from 'react';
import AuthContext from '../../Service/auth-context';

function Executivechat({ socket }) {
  const [chat, setChat] = useState([]);

  const socketRef = useRef();
  const authCtx = useContext(AuthContext);
  let userId = authCtx.id;

  let username = authCtx.username;
  console.log(authCtx.id);

  useEffect(() => {
    // socket2.emit('leaveroom','corenotification')
    socket.emit('leaveroom', 'executivenotification');

    socketRef.current = io.connect('http://localhost:5000');

    socketRef.current.on('connect', function () {
      console.log('connection established using sockets...!');

      socketRef.current.emit('join_room', {
        username: userId,
        chatroom: 'executive',
        chatbox: '',
      });

      socketRef.current.on('user_joined', (data) => {
        alert('hogya connect');
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
      socket.emit('join_room', {
        username: authCtx.id,
        chatroom: 'executivenotification',
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
        chatroom: 'executive',
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
      socket.emit('caninotifyothers', { data: data, room: 'executive' });

      // console.log(chat)
      // if(userId==data.userid._id)
      // {
      //     document.getElementById('chatbody').append(data.message)
      // }
      // else{
      //     document.getElementById('chatbody').append(data.message);
      // }

      // socketRef.current.emit('caninotifyothers',{data:data,room : 'core'})
    });
  }, []);

  const rendermessage = (data) => {
    if (data.userid._id == userId) {
      return (
        <div
          style={{
            display: 'flex',
            float: 'right',
            marginTop: '10px',
            marginBottom: '10px',
          }}
          className='chat-Second-User-Div'
        >
          <div
            style={{
              background: 'lightgreen',
              padding: '0.5rem',
              borderRadius: '17px',
              marginRight: '7px',
              width: '100%',
            }}
            className='second-User-Message'
          >
            <div style={{ width: '100%' }}>
              <span
                style={{ fontWeight: '700', color: 'black', width: '100%' }}
              >
                Anand kumar Choudhary
              </span>
            </div>
            <div>
              <span style={{ width: '100%', fontSize: '20px', color: 'black' }}>
                {data.message}
              </span>
            </div>
            <div
              style={{ fontSize: '12px', color: 'black' }}
              className='second-User-Message-Time'
            >
              09:45
            </div>
          </div>
          <div
            style={{ marginLeft: '5px' }}
            className='Second-User-image-container'
          >
            <img
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                borderImage: 'none',
                verticalAlign: 'middle',
              }}
              className='chat-second-User-image'
              src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
              alt=''
            />
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: 'flex',
            float: 'left',
            marginTop: '10px',
            marginBottom: '10px',
          }}
          className='chat-First-User-Div'
        >
          <div className='first-User-image-container'>
            <img
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                borderImage: 'none',
                verticalAlign: 'middle',
              }}
              className='chat-first-User-image'
              src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
              alt=''
            />
          </div>
          <div
            style={{
              background: 'lightblue',
              padding: '0.5rem',
              borderRadius: '17px',
            }}
            className='first-User-Message'
          >
            <span style={{ fontWeight: '700' }}>Anand kumar Choudhary</span>
            <div>
              <span>{data.message}</span>
            </div>
            <div
              style={{ padding: '2px', float: 'right' }}
              className='first-User-Message-Time'
            >
              09:45
            </div>
          </div>
        </div>
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
                  <div className='chat-Messages'>
                    {chat.map((data) => {
                      return <div className='msg'>{rendermessage(data)}</div>;
                    })}
                  </div>
                </Card>
              </div>
              <div className='write-chat-Message'>
                <div style={{ width: '90%' }}>
                  <TextField
                    id='message-input'
                    style={{ width: '100%' }}
                    label='Enter your text'
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

export default Executivechat;
