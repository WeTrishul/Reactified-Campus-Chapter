const mongoose=require('mongoose')
const db = require('../config/db')


const commentSchema = new mongoose.Schema({

    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    ,
    postid : {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
    },

    commentBody : {
            type:String,
            required:true
    }
},{
    timestamps:true
})

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment