const mongoose=require('mongoose')
const db = require('../config/db')
const bcrypt=require('bcrypt')
const validator =require('validator')

/*mongoose.connect('mongodb://127.0.0.1:27017/CodeChefCampusChapter',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})*/



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
    CurrentRating:{
        type:String
    },
    OverallRatings:[{
        type:String
    }]
    })




const User = mongoose.model('User', userSchema)

module.exports = User
    