const { findById } = require('../models/user')
const User = require('../models/user')


module.exports.notification = (socketserver) =>{



    let io = require('socket.io')(socketserver, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
      })


    io.sockets.on('connection',(socket)=>{
        console.log('notification engine running')
        
        
      socket.on('notify',async(data)=>{
        try {

          console.log('hello ')
            const user = await User.find({username:data.to})
            console.log(user[0].name)
             user[0].Notifications.push(data.from+' ' + data.msg)
            user[0].seenAllNotifications='no'
             user[0].save()
            io.in(data.to).emit('notification',data.from+' ' + data.msg)
          
        } catch (error) {
          console.log(error)
        }
            
      })
        socket.on('join_room',async(data)=>{
         
          socket.join(data.chatroom)

          io.in('realshivam').emit('user_joined')
    
        })

    })

}