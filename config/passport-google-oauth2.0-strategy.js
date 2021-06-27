const passport =require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const User = require('../models/user')
const passport_local=require('./passport-local-auth')
const LoginMailer = require('../mailers/login_mailer')

passport.use(new googleStrategy({
    clientID:'724954914773-8tgpsd25gtsegic3g6g1jom7sslie8e9.apps.googleusercontent.com',
    clientSecret:'TNMJyQfBVgQAQOglMyxIWLce',
    callbackURL:'http://localhost:3000/users/auth/google/callback'
},
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec((err,user)=>{
            if(err)
            {
                console.log('Error in google passport authentication',err)
                return
            }  
            //console.log(profile.email)
            console.log(accessToken,refreshToken)
            if(user)
            {
                LoginMailer.newLogin(user)
                console.log(profile.emails[0].value)
                return done(null,user)
            }
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                    username:profile.emails[0].value
                },function(err,user){
                    if(err){
                        console.log('Error in google passport authentication',err)
                        return
                    }
                    LoginMailer.newLogin(user)
                    console.log(profile.emails[0].value)
                    return done(null,user)
                })
            }
        })
    }
))






module.exports = passport