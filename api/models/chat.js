const mongoose=require('mongoose')
const db = require('../config/db')


const chatSchema = new mongoose.Schema({

    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
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