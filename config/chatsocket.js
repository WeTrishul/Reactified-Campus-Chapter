
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
          chats = await Chat.find({chatroom:data.chatroom}).populate('userid')
          console.log(chats)
          socket.join(data.chatroom)

          socket.emit('old_messages',chats)

          io.in(data.chatroom).emit('user_joined',data)
        })

        socket.on('send_message', async(data)=>{
          // Chat.create(data,(error,chat)=>{
          //   io.in(data.chatroom).emit('receive_message', chat);
          // })
          console.log(data)
          const c = {
            userid : data.username,
            chatroom : data.chatroom,
            message : data.message
          }
          var chat = await Chat.create(c)
          chat = await chat.populate('userid').execPopulate()
          // console.log(chat)
          io.in(data.chatroom).emit('receive_message', chat);
          
          
      })

    })

}