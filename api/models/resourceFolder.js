const mongoose=require('mongoose')
const db = require('../config/db')

var folder =  new mongoose.Schema({
    name: {
        type:String,
        default:'root'
    },
    userid:{
            type:mongoose.Schema.Types.ObjectId ,
            ref:'User'
       },
    files: [],
    categoryName:{
        type:String
    }
});



const Folder = mongoose.model('folder',folder)

module.exports = Folder
    