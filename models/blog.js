const mongoose=require('mongoose')
const db = require('../config/db')


BlogSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },

    content:{
        type:String
    }

}, {
    timestamps: true
})

const Blog = mongoose.model('Blog',BlogSchema)

module.exports = Blog