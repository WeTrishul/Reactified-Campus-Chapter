const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Post = require('../models/post')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')
const fetch = require('node-fetch')
const moment = require('moment')
const startingTime = require('../config/timecalc')



module.exports.discuss = (req,res)=>{

    Post.find({}).populate('userid').exec((error,posts)=>{
        console.log(posts)
        return res.render('DiscussionForum',{
            posts:posts
        })
    })
    
}

module.exports.postit = (req,res)=>{
    
    Post.create({
        userid:req.user._id,
        postBody:req.body.postBody
    },(error,post)=>{
        if(error){return res.redirect('back')}
        console.log(post)
        return res.redirect('/Discuss')
        
    })

}