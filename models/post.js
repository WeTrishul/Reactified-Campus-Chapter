const mongoose=require('mongoose')
const db = require('../config/db')

const PostSchema = new mongoose.Schema({

    userid:{
         type:mongoose.Schema.Types.ObjectId ,
         ref:'User'
    },
    postBody:{
        type:String,
        required:true
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    report: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report'
        }
    ]
},{
    timestamps:true
})


const Post = mongoose.model('Post', PostSchema)

module.exports = Post