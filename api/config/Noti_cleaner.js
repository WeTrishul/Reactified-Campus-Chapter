
const User = require('../models/user')


module.exports.cleanit=async()=>{


const allusers = await User.find({})

  allusers.forEach(async (user)=>{
      
        user.Notifications = []
        user.save()
})

}
