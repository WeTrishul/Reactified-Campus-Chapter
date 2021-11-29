
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import * as  noti from "../../Service/notification_engine"
import AuthContext from '../../Service/auth-context';
import SendIcon from '@mui/icons-material/Send';
import { useContext } from 'react';
import './ExecutiveChat.css'

function ExecutiveChat({socket}) {

     // const [ state, setState ] = useState({ message: "", name: "" })
     const [ chat, setChat ] = useState([])

    
     const socketRef = useRef()
     const authCtx=useContext(AuthContext)
     let userId=authCtx.id;
 
     let username=authCtx.username
     console.log(authCtx.id)
  
     useEffect(
         () => {
 
             // socket2.emit('leaveroom','corenotification')
             socket.emit('leaveroom','executivenotification')
            
             socketRef.current = io.connect("http://localhost:5000")
  
             socketRef.current.on('connect', function(){
                 console.log('connection established using sockets...!');
              
                 socketRef.current.emit('join_room',{
                         username:userId,
                         chatroom:'executive',
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
 
 
 
             // socketRef.current.on('yesyoumaynotify',(data)=>{
 
             //     console.log('yes you may')
                     
             // })
     
  
            
             return () => {
                 

                 socket.emit('join_room',{
                    username:authCtx.id,
                    chatroom:'executivenotification',
                    chatbox : ''
                })
                 
                 socketRef.current.disconnect()}
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
             chatroom: 'executive'
         });
         document.getElementById('message-input').value = "";
     }
    
     }
     useEffect(() =>{
 
         socketRef.current.on('receive_message',(data)=>{
             // setChat(data.message)
          
             // setChat([ ...chat, data ])
             setChat(chat => [ ...chat, data ]);
             console.log('Bol kya dikkat h')
             socket.emit('caninotifyothers',{data:data,room : 'executive'})

             // console.log(chat)
             // if(userId==data.userid._id)
             // {
             //     document.getElementById('chatbody').append(data.message)
             // }
             // else{
             //     document.getElementById('chatbody').append(data.message);
             // }
           
             // socketRef.current.emit('caninotifyothers',{data:data,room : 'core'})
 
         })
 
     },[])
  
     const rendermessage = (data) =>{
         
      
         // console.log(data.userid._id)
         if(data.userid._id==userId)
         {
             return(
                 // <div className="selfmsg">
                 //     {data.message}  
                 // </div>
 
 <span className="user-text">
                  {data.message}
              </span>
             )
 
                 
         }
         else{
             return(
         //     <div className="friendmsg">
         //     {data.message} 
         // </div>
 
 <span className="friend-text">
                 {data.message}
             </span>
         )
             
         }
     }
 
     return (
         <div>
             {/* <div className="border-box">
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
             </div> */}
 
 
 
 
 
 
 
 
 
             <div className ="chat-outerbox">
          <div className ="messageTyping-Container">
          <div className ="innermessagebox">
              {
                             chat.map((data)=>{
                                return( <div className="msg">
                                     
                                     {rendermessage(data)}
                            
                                 </div>)
                             })
                       
                         }
             </div>            
 
             <div className ="chat-typebox">
                 <div className="typemessage">
                 <input type="text" id="message-input" className="inputTextBox" placeholder="Write your message"/>
                 </div>
                 <div onClick={sendmsg} className="chatSpan">
                     <SendIcon/>
                 </div>
              </div>
          </div> 
         </div>
 
 
 
 
 
 
 
 
 
 
             {/* <div className ="chat-outerbox">
 //         <div className ="messageTyping-Container">
 //         <div className ="innermessagebox">
 //             {
                             chat.map((data)=>{
                                return( <div className="msg">
                                     
                                     {rendermessage(data)}
                            
                                 </div>)
                             })
                       
                         }
 //             {/* <div className="user-text">
 //                 hyy
 //             </div>
 //             <div className="friend-text">
 //                 hello
 //             </div> */}
 {/* //         </div> */}
                 
 {/* //             <div className ="chat-typebox">
 //                 <div className="typemessage">
 //                 <input type="text"  className="inputBox" placeholder="Write your message"/>
 //                 </div>
 //                 <div onClick={sendmsg}  className="chatSpan"><SendIcon/></div>
 //             </div>
 //         </div> */}
 {/* //     </div> */}
 
         </div>
     )

}

export default ExecutiveChat
