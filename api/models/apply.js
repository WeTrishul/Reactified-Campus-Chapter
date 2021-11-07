const mongoose=require('mongoose')
const db = require('../config/db')


applySchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    appliedRole:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    link1:{
        type:String,
        required:true
    }
})

const apply = mongoose.model('apply',applySchema)

module.exports = apply