const mongoose=require('mongoose')
const db = require('../config/db')
const path = require('path')
const multer = require('multer')
const BANNER_PATH = path.join('/uploads/eventbanner') //dp_path

const multerBanner = require('../config/multerBanner') //multerstorage


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
        type:String,
        required:true
    },

    Registeredusers : [{
        type:mongoose.Schema.Types.ObjectId,
      
        ref:'User'
  
    }],
    eventbanner:{
        type:String,
        
        required:true
    },
    eventLink:{
        type:String,
        default:'https://www.instagram.com/',
        required:true  
    }
},{
    timestamps:true
})



EventSchema.statics.uploadBanner = multer({ storage: multerBanner,
    fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    // console.log(ext)
    if(ext !== '.jpg'&& ext !== '.jpeg' && ext !== '.png') {
        return callback(new Error('Only Images are allowed'))
    }
    callback(null, true)
}
}).single('eventbanner')

EventSchema.statics.bannerPath = BANNER_PATH


const Event = mongoose.model('Event',EventSchema)

module.exports = Event