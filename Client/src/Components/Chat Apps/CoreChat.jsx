




import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import AuthContext from '../../Service/auth-context';
 
import { useContext } from 'react';
 
import './CoreChat.css';
function CoreChat() {
 
    // const [ state, setState ] = useState({ message: "", name: "" })
    const [ chat, setChat ] = useState([])
 
    
 
    const socketRef = useRef()
    const authCtx=useContext(AuthContext)
    let userId=authCtx.id;
 
    useEffect(
        () => {
            socketRef.current = io.connect("http://localhost:5000")
 
            socketRef.current.on('connect', function(){
                console.log('connection established using sockets...!');
    
                socketRef.current.emit('join_room',{
                        username:userId,
                        chatroom:'core',
                        chatbox : ''
                    })
        
                    socketRef.current.on('user_joined',(data)=>{
                        alert('hogya connect')
                        console.log('user joined',data)
                    })
                
            });
 
            // socketRef.current.on("message", ({ name, message }) => {
            //  setChat([ ...chat, { name, message } ])
            // })
 
            socketRef.current.on('old_messages',(data)=>{
              
                setChat(data)
               
 
            })
 
           
            return () => socketRef.current.disconnect()
        },
        []
    )
 
    // useEffect(()=>{
 
        
        
    // },[])
    
  
 
    const sendmsg = () =>{
        
       var message= document.getElementById('message-input').value
    //    console.log(message)
       if (message != ''){
        socketRef.current.emit('send_message', {
            message: message,
            username: userId,
            chatroom: 'core'
        });
        document.getElementById('message-input').value = "";
    }
   
    }
    useEffect(() =>{

        socketRef.current.on('receive_message',(data)=>{
            // setChat(data.message)
            var anand = chat;
            anand.push(data.message)
            setChat(anand)
            // console.log(chat)
            // if(userId==data.userid._id)
            // {
            //     document.getElementById('chatbody').append(data.message)
            // }
            // else{
            //     document.getElementById('chatbody').append(data.message);
            // }
           
    
        })

    },[chat])
 
    const rendermessage = (data) =>{
        
        console.log("data check")
        console.log(data)
        // console.log(data.userid._id)
        if(data.userid._id==userId)
        {
            return(
                <div className="selfmsg">
                                {data.message}  
                            </div>)
        }
        else{
            return(
            <div className="friendmsg">
            {data.message} 
        </div>)
            
        }
    }

    return (
        <div>
            <div className="border-box">
                <div className="chat-box">
                    <div className="chat-heading">
                        <h2>Core Team</h2>
                    </div>
                    <div className="chat-body" id="chatbody">
                        {
                            chat.map((data)=>{
                               return( <div className="msg">
                                    
                                    {rendermessage(data)}
                           
                                </div>)
                            })
                      
                        }
                       
                        
                        
                    </div>
                    <div className="text-area">
                        <div className="textdiv">
                        <input type="text" id="message-input" className="type-area" placeholder='Enter your Text'/>
                        <button onClick={sendmsg} className="send-btn">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default CoreChat