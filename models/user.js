const mongoose=require('mongoose')
const db = require('../config/db')
const bcrypt=require('bcrypt')
const validator =require('validator')
const path = require('path')
const multer = require('multer')
const Questions_PATH =path.join('/uploads/questionsetters/questions')


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
    /*number:{
        type:String,
        required:true,
        minlength:10,
        validate(value){
        if(value.length <10 || value.length >10) {  throw new Error('Enter 10 digits phone number')  }
        }
    },*/
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
    spoj:{
        type: String,
        default: "nhi hai",
    },
    UserType:{
        type: String,
        reuired:true
    },
    questions:{
        type:String,
        default:'Nhi hai'
    }
},  {
        timestamps:true
    })

//defing disk configuration
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname,'..',Questions_PATH))
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now() + '.pdf')
        }
      })

      userSchema.statics.uploadedQuestions = multer({ storage: storage,
            fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            if(ext !== '.pdf') {
                return callback(new Error('Only Pdf is allowed'))
            }
            callback(null, true)
        }
     }).array('questions',100)
      userSchema.statics.questionsPath = Questions_PATH



const User = mongoose.model('User', userSchema)

module.exports = User
    