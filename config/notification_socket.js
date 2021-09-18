
module.exports.notification = (socketserver) =>{



    let io = require('socket.io')(socketserver, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
      })


    io.sockets.on('connection',(socket)=>{
        console.log('notification engine running')
        
        
      socket.on('notify',(data)=>{
            console.log('hello ')
            io.in(data.to).emit('notification',data.from+' ' + data.msg)
      })
        socket.on('join_room',async(data)=>{
         
          socket.join(data.chatroom)

          io.in('realshivam').emit('user_joined')
    
        })

    })

}