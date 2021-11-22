const mongoose=require('mongoose')
const db = require('../config/db')


BlogSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    }

}, {
    timestamps: true
})

const Blog = mongoose.model('Blog',BlogSchema)

module.exports = Blog