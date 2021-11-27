// // let socketgiver
// // class NotiEngine{
// //     constructor(chatBoxId, username ,chattype){
// //         this.chatBox = $(`#${chatBoxId}`);
// //         this.username = username;
      

// //         this.socket = io.connect('http://localhost:7000');

// //         if (this.username){
// //             this.connectionHandler();
// //         }

// //     }


// //     connectionHandler(){

// //         const self = this

// //         this.socket.on('connect', function(){
// //             console.log('notification engine is running...!');

// //                 self.socket.emit('join_room',{
                    
// //                     chatroom:self.username
// //                 })
                
// //                 socketgiver=self.socket
               
               

// //                 self.socket.on('notification',(data)=>{
// //                     console.log(data)
                    
// //                     $("#bll").css("fill", '#FF0000');

// //                     let currcoti = $('#notis')

// //                     $('#nothing').remove()

// //                     currcoti.prepend('<a href="'+data.placetogo +'" class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"><img class="h-8 w-8 rounded-full object-cover mx-1" src="https://cdn.staticcrate.com/stock-hd/effects/footagecrate-4k-bell-icon-prev-full.png" alt="avatar"><p class="text-gray-600 text-sm mx-2"><span class="font-bold" href="#">'+data.msg +'</span></p></a>')
                    

// //                     new Noty({
// //                         theme: 'relax',
// //                         text: data.msg,
// //                         type: 'success',
// //                         layout: 'centerRight',
// //                         timeout: 1500
                        
// //                     }).show();

                    
                    
// //                 })

// //                 self.socket.on('changedbell',()=>{
// //                     let bell = $('#bll')

// //                     $("#bll").css("fill", '#000000');
// //                 })

    
            
// //         });

// //     }

  
// // }


// // class Notihandler {
// //     constructor(notifieruser){
      
// //         this.notifieruser=notifieruser
      
// //     }

// //     notify(to,msg,placetogo)
// //     {
// //         console.log('imported')
// //         socketgiver.emit('notify',{
// //             to : to,
// //             from:this.notifieruser,
// //             msg : msg,
// //             placetogo:placetogo
// //         })
       
// //     }

// //     changebell()
// //     {
// //         socketgiver.emit('changebell',{

// //             userid:this.notifieruser

// //         })
// //     }

// // }


























// import React, { useEffect, useRef, useState } from "react"
// import io from "socket.io-client"
// import AuthContext from '../Service/auth-context';
// import{useContext} from 'react'

// let socketgiver

// let socketgiver2

// export let usernaam 


// export let userid

//    export const notify =  (to,msg,placetogo) =>{
//         socketgiver.emit('notify',{
//             to : to,
//             from:usernaam,
//             msg : msg,
//             placetogo:placetogo
//         })

//     }


//   export  const Notiengineconnect = (username)=>{
//     const socketRef = useRef()
  
//     const authCtx = useContext(AuthContext);
//     usernaam = username
//     userid = authCtx.id
//         socketRef.current = io.connect("http://localhost:7000")
 
//         socketRef.current.on('connect', function(){
//             console.log('connection established using sockets...!');

//             socketRef.current.emit('join_room',{
                
//                 chatroom:username
//             })
       
//             socketgiver=socketRef.current
            
//         });

//         socketRef.current.on('notification',(data)=>{
//             console.log('notification aya')
//             console.log(data)
            
            
//         })


    

//         return () => socketRef.current.disconnect()

//     }



   




//   export  const ChatNoticonnect = ()=>{
//     const socketRefchat = useRef()
  
 
//         socketRefchat.current = io.connect("http://localhost:5000")

//         socketgiver2=socketRefchat.current



//         socketRefchat.current.on('yesyoumaynotify',(data)=>{


//             console.log('yes you may')
//             console.log(data)


//         })
            
//         return () => socketRefchat.current.disconnect()

//     }


//     export const JoinCore = (userid) =>{
        
//                 socketgiver2.emit('join_room',{
//             username:userid,
//             chatroom:'corenotification',
//             chatbox : ''
//         })

//         socketgiver2.on('user_joined',(data)=>{
//             console.log('user joined',data)
//         })

//     }
  
        
           