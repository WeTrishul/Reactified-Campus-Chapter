const mongoose=require('mongoose')
const db = require('../config/db')




const upcomingSchema = new mongoose.Schema({
    codeforces:[{}],
    codechef:[{}]
})



const upcomingEvents = mongoose.model('upcomingEvents',upcomingSchema)

module.exports = upcomingEvents
    