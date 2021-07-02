const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comments')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')
const fetch = require('node-fetch')
const moment = require('moment')
const startingTime = require('../config/timecalc')



module.exports.discuss = (req,res)=>{

    

    Post.find({}).populate('userid').populate({
        path:'comments',
        populate:{
            path:'userid'
        }
    }).exec((error,posts)=>{
        // console.log(posts)
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
      
        return res.redirect('/Discuss')
        
    })

}

module.exports.commentit = (req,res)=>{

        Post.findById(req.body.postid,(error,post)=>{
            if(post)
            {
                Comment.create({
                    userid:req.user._id,
                    postid:req.body.postid,
                    commentBody : req.body.commentBody
                },(error,comment)=>{
                    post.comments.push(comment)
                    post.save()
                    return res.redirect('/Discuss')
                })
            }
        })
}


module.exports.deletepost = (req,res)=>{
    Post.findById(req.params.id,(error,post)=>{
        if(req.user.id==post.userid)
        {
            post.remove()
            Comment.deleteMany({postid:req.params.id},(error)=>{
                res.redirect('back')
            })
        }
        else{
            res.redirect('back')
        }
    })
}

module.exports.deletecomment = (req,res)=>{
    Comment.findById(req.params.id,(error,comment)=>{
        if(req.user.id==comment.userid)
        {
            var postid = comment.postid
            comment.remove()

            Post.findByIdAndUpdate(postid,{$pull : {comments:req.params.id}},(error,post)=>{
                return res.redirect('back')
            })
        }
        else{
            return res.redirect('back')
        }
    })
}

