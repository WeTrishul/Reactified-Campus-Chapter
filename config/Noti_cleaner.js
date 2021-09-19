
const User = require('../models/user')


module.exports.cleanit=()=>{


const allusers = await User.find({})

  allusers.forEach(async (user)=>{
      
        user.Notifications = []
        user.save()
})

}
