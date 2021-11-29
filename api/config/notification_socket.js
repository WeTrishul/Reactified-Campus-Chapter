const { findById } = require('../models/user')
const User = require('../models/user')


module.exports.notification = (socketserver) =>{



    let io = require('socket.io')(socketserver, {
        cors: {
          origin: "http://localhost:3001",
          methods: ["GET", "POST"]
        }
      })


    io.sockets.on('connection',(socket)=>{
        // console.log('notification engine running')


        
        
      socket.on('notify',async(data)=>{
        try {
          
          if(data.to=='reportnoti')
          {
            console.log('huuu')
            const user = await User.find({$or:[ {UserType:'Admin'}, {UserType:'EventsLead'}]})
            const notific = {
              msg : data.msg,
              placetogo:data.placetogo
            }

            user.forEach((user)=>{
              user.Notifications.push(notific)
             user.seenAllNotifications='no'
              user.save()
              io.in(user.username).emit('notification',notific)
           })

           

           

          }

          else if(!data.to)
          {
            // notifying all users

            console.log('hello ')
            const user = await User.find({})
            const notific = {
              msg : data.msg,
              placetogo:data.placetogo
            }
            user.forEach((user)=>{
               user.Notifications.push(notific)
              user.seenAllNotifications='no'
               user.save()
            })

            io.emit('notification',notific)

          }

          else{

             // notifying specific users
             console.log('yhin par aya ')
          console.log('hello ')
          const user = await User.find({username:data.to})
          console.log(user[0].name)
         
          const str = data.msg
          if(str[2]=='n')
          {
              data.from = ''
          }
          if(str[0]=='r')
          {
            data.from='Someone '
          }
          const notific = {
            msg : data.from+' ' + data.msg,
            placetogo:data.placetogo
          }
          console.log(data.placetogo)
           user[0].Notifications.push(notific)
          user[0].seenAllNotifications='no'
           user[0].save()
          io.in(data.to).emit('notification',notific)
            
          }

          
        } catch (error) {
          console.log(error)
        }
            
      })

      // socket.on("sunrheho",()=>{
      //   socket.emit("bolna",'heya')
      // })

      socket.on('leaveroom',async(roomname)=>{
        console.log("nikal diya")
        socket.leave(roomname)
      })

      socket.on('changebell',async(data)=>{

        const user = await User.find({username:data.userid})
        user[0].seenAllNotifications='yes'
        user[0].save()

        socket.emit('changedbell')

      })

        socket.on('join_room',async(data)=>{


          if(data.chatroom=='corenotification')
          {
            console.log(data.username)
              var user = await User.findById(data.username)
              user.seenAllCoreChats='no'
              user.save()
              socket.join('corenotification')
              console.log("core vala join hogya h")
          }
          else if(data.chatroom=='executivenotification')
          {
            var user = await User.findById(data.username)
              user.seenAllExecChats='no'
              user.save()
            socket.join('executivenotification')
            console.log("executive vala join hogya h")
          }
          else{
          socket.join(data.chatroom)
          console.log(data)
          io.in(data.chatroom).emit('user_joined')


          }
    
        })



      socket.on('caninotifyothers',async(data)=>{

        console.log('aagya idhar')

        console.log('Mai hoon chat ', data)
// io.emit('notifyroom',notific)

        if(data.room=='core')
        {




          const user = await User.find({ $or:[ {UserType:'Admin'}, {UserType:'EventsLead'},{UserType:'MediaLead'}],seenAllCoreChats:'no'})
          console.log(user)
          const notific = {
            msg : data.data.userid.username + ' texted in core chat',
            placetogo:'/coreteam'
          }
      
        user.forEach((user)=>{
          if(user._id!=data.data.userid._id)
          {
            user.Notifications.push(notific)
            user.seenAllCoreChats='no'
             user.save()
          }
      
       })



       io.in('corenotification').emit('yesyoumaynotify',notific)


        }
        else{

          const user = await User.find({ $or:[ {UserType:'Admin'}, {UserType:'Executive'}, {UserType:'EventsLead'},{UserType:'MediaLead'}],seenAllExecChats:'no'})
          // console.log(user)
          const notific = {
            msg : data.data.userid.username + ' texted in executive chat',
            placetogo:'/executivechat'
          }
      
        user.forEach((user)=>{
          if(user._id!=data.data.userid._id)
          {
            user.Notifications.push(notific)
            user.seenAllExecChats='no'
             user.save()
          }
       })


       io.in('executivenotification').emit('yesyoumaynotify',notific)


        }

      })

    })

}