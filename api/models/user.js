const mongoose=require('mongoose')
const db = require('../config/db')
const validator =require('validator')
const path = require('path')
const multer = require('multer')
const Questions_PATH =path.join('/uploads/questionsetters/questions')
const Dp_PATH = path.join('/uploads/profilepic')
const multerStorage = require('../config/multerQuestion')
const multerDp = require('../config/multerDp')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    codeforces: {
        type: String,
        default: "nhi hai ",
        },

    codechef:{
        type: String,
        default: "nhi hai",
        },

    hackerrank:{
        type: String,
        default: "nhi hai",
        },
    leetcode:{
        type: String,
        default: "nhi hai",
    },
    UserType:{
        type: String,
        default:"Student"
    },
    questions:{
        type:String
    },
    dp:{
        type:String,
        default:'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png'
    },

    CurrentRating:{
        type:String
    },
    OverallRatings:[{
        type:String
    }],
    Notifications :{
        type:Array,
        default: {
            msg:"Welcome to campus-chapter",
            placetogo : ""
        }

    },
    seenAllNotifications : {
        type:String,
        default:'yes'
    },
    seenAllCoreChats : {
        type:String,
        default:'yes'
    },
    seenAllExecChats : {
        type:String,
        default:'yes'
    },
    resetLink:{
        data:String,
        default:''
    },
    arr:{
        type:Array
    }, 
    resourcesuploaded : {
        type:Number,
        default:0
    }, 
    bio:{
        type:String,
        default:'No bio'

    },
    token:{
        type:String,
        default:"nhi hai"
    }
}, 
{
 timestamps:true
})

//defing disk configuration


  userSchema.statics.uploadedQuestions = multer({ storage: multerStorage,
        fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.pdf') {
            return callback(new Error('Only Pdf is allowed'))
        }
        callback(null, true)
    }
 }).array('questions',100)

  userSchema.statics.questionsPath = Questions_PATH


  userSchema.statics.uploadedDp = multer({ storage: multerDp,
    fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    console.log(ext)
    if(ext !== '.jpg'&& ext !== '.jpeg' && ext !== '.png') {
        return callback(new Error('Only Images are allowed'))
    }
    callback(null, true)
}
}).single('dp')

userSchema.statics.dpPath = Dp_PATH

const User = mongoose.model('User', userSchema)

module.exports = User
    