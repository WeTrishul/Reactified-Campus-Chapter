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
        // console.log('notification engine running')
        
        
      socket.on('notify',async(data)=>{
        try {

          console.log('hello ')
            const user = await User.find({username:data.to})
            console.log(user[0].name)
            const notific = {
              msg : data.from+' ' + data.msg,
              placetogo:data.placetogo
            }
            console.log(data.placetogo)
             user[0].Notifications.push(notific)
            user[0].seenAllNotifications='no'
             user[0].save()
            io.in(data.to).emit('notification',notific)
          
        } catch (error) {
          console.log(error)
        }
            
      })

      socket.on('changebell',async(data)=>{

        const user = await User.find({username:data.userid})
        user[0].seenAllNotifications='yes'
        user[0].save()

        socket.emit('changedbell')

      })

        socket.on('join_room',async(data)=>{
         
          socket.join(data.chatroom)

          io.in('realshivam').emit('user_joined')
    
        })

    })

}