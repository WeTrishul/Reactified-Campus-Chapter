
const Chat = require('../models/chat')

module.exports.chat = (socketserver) =>{



    let io = require('socket.io')(socketserver, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
      })


    io.sockets.on('connection',(socket)=>{
        console.log('yes i am also connected')

        
      
        socket.on('join_room',async(data)=>{
          console.log('joining request by ' , data)
          let chats = []
          chats = await Chat.find({chatroom:data.chatroom})
          console.log(chats)
          socket.join(data.chatroom)

          socket.emit('old_messages',chats)

          io.in(data.chatroom).emit('user_joined',data)
        })

        socket.on('send_message', (data)=>{
          Chat.create(data,(error,chat)=>{

          })
          console.log(data)
          io.in(data.chatroom).emit('receive_message', data);
      })

    })

}