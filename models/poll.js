const mongoose=require('mongoose')
const db = require('../config/db')


const pollSchema = new mongoose.Schema({
    pollName :{
        type:String,
        required: true,
        trim: true
    },

    question :{
        type:String,
        required: true,
        trim: true 
    },

    optionA:{
        type:String,
        required: true,
    },
    optionB:{
        type:String,
        required: true,
    },
    optionC:{
        type:String
    },
    optionD:{
        type:String
    },
    checkUser: [],
    A:{
        type:Number,
        default:0
    },
    B:{
        type:Number,
        default:0
    },
    C:{
        type:Number,
        default:0
    },
    D:{
        type:Number,
        default:0
    }
})

const poll = mongoose.model('Poll', pollSchema)

module.exports = poll
