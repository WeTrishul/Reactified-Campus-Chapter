const mongoose=require('mongoose')
const db = require('../config/db')


announcementSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

const announcement = mongoose.model('announcement',announcementSchema)

module.exports = announcement