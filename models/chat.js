const mongoose=require('mongoose')
const db = require('../config/db')


const chatSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    }
    ,
    chatroom : {
            type:String,
            required:true
    },

    message : {
            type:String,
            required:true
    },
  
},{
    timestamps:true
})

const Chat = mongoose.model('Chat',chatSchema)

module.exports = Chat