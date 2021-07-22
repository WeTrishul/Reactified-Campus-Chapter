module.exports.chat = (socketserver) =>{



    let io = require('socket.io')(socketserver, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
      })


    io.sockets.on('connection',(socket)=>{
        console.log('yes i am also connected')

        socket.on('join_room',(data)=>{
          console.log('joining request by ' , data)

          socket.join(data.chatroom)

          io.in(data.chatroom).emit('user_joined',data)
        })

        socket.on('send_message', (data)=>{
          console.log(data)
          io.in(data.chatroom).emit('receive_message', data);
      })

    })

}