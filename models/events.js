const mongoose=require('mongoose')
const db = require('../config/db')


const EventSchema = new  mongoose.Schema({

    creatorid : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    eventname : {
        type:String,
        required:true
    },

    aboutevent:{
        type:String,
        required:true
    },

    eventStartTime:{
        type:String,
        required:true
    },
    eventEndTime : {
        type:String,
        required:true
    },
    eventDate : {
        type:Date,
        required:true
    },

    Registeredusers : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]

},{
    timestamps:true
})


const Event = mongoose.model('Event',EventSchema)

module.exports = Event