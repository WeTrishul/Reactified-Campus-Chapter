const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')
const multer = require('multer')
const path=require('path')
const fs =require('fs')

module.exports.setQuestions= (req,res)=>{
    if(req.isAuthenticated())
    {
   res.render('SetQuestions',{
    title:'Upload Questions',
    user:req.user
})
}
else
{
    res.redirect('back')  
}
}

module.exports.upload = async(req,res)=>{
    const _id = req.params.id
    let user = await User.findOne({_id})
    try {
        User.uploadedQuestions(req,res,function(error){
            if(error)
            {
                console.log('******Multer Error*****'+error)  
            }
           if(req.files[0])
           { 
               let path = User.questionsPath+'/'+ req.files[0].filename+','
               for(var i=1;i<req.files.length;i++)
            {
                    path = path + User.questionsPath+'/'+ req.files[i].filename + ','
            }    
                var LastIndexOfComma = path.lastIndexOf(',')
                path = path.substr(0,LastIndexOfComma)
                user.questions = path
                user.save()
                   
           }
        })     
        return res.redirect('/fileupload')   
                    
    }catch (error) {
        console.log('Error'+error)
        res.redirect('/dashboard')
    }
}

module.exports.profile = async(req,res)=>{

            res.render('profile',{
                title:'Profile Page',
                user:req.user
            })
    }

module.exports.uploadDp = async(req,res)=>{
    const _id = req.params.id
    let user = await User.findOne({_id})
    try {
        User.uploadedDp(req,res,function(error){
            if(error)
            {
                console.log('******Multer Error from Dp*****'+error)  
            }
           if(req.file)
           { 
               console.log(req.file)
            if(user.dp!=='Nhi hai')
            {
                fs.unlinkSync(path.join(__dirname,'..',user.dp))
            }


               let path1= User.dpPath+'/'+ req.file.filename
                user.dp = path1
                user.save()
                   
           }
        })     
        const username = user.username
        return res.redirect('/profilepage')
                    
    }catch (error) {
        console.log('Error'+error)
        res.redirect('/dashboard')
    }
}

