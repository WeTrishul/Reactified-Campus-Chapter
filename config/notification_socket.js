

module.exports.notification = (socketserver) =>{



    let io = require('socket.io')(socketserver, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
      })


    io.sockets.on('connection',(socket)=>{
        console.log('notification engine running')

        
      socket.on('heyserver',(data)=>{
            console.log('hello ' + data)
      })
        socket.on('join_room',async(data)=>{
         
          socket.join(data.chatroom)

          io.in('realshivam').emit('user_joined')
    
        })

    })

}