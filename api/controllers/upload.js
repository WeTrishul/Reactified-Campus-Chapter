const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Event = require('../models/events')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')
const cloudinary = require('../config/cloudinary')
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
    
    
    try {

        if(!req.isAuthenticated())
        {
          return   res.redirect('/login')
        }

        const _id = req.params.id
        let user = await User.findOne({_id})
        
        var paths,arr=[];
        User.uploadedQuestions(req,res,async function(error){
            try {
                if(error)
                {
                    console.log('******Multer Error*****'+error) 

                    if (req.body){
                
                        console.log('yahan aagya')
                        return res.status(200).json({
                            data: {
                                done: 'no'
                            },
                            message: "nhi hua!"
                        });
                    }
                   
                }
               if(req.files[0])
               { 
                    paths = User.questionsPath+'/'+ req.files[0].filename+','
                   for(var i=1;i<req.files.length;i++)
                {
                        paths = paths + User.questionsPath+'/'+ req.files[i].filename + ','
                        
                }    
                    var LastIndexOfComma = paths.lastIndexOf(',')
                    paths = paths.substr(0,LastIndexOfComma)
                    user.questions = paths
                    console.log(paths,'bhai node hai yeh')
                    await user.save()
    
                    arr =  paths.split(',')
                    arr.forEach(ele => user.arr.push(ele))
    
                    await user.save()
    
                    console.log('Idhar aagya')
    
                    // if (req.body.flag){
                
                        console.log('yahan aagya')
                        return res.status(200).json({
                            data: {
                                done: 'yes',
                                ele:ele
                            },
                            message: "uploaded!"
                        });
                    // }
                    
               }  

               
                
            } 
           catch (error) {
                console.log(error)
                res.render('error_page')
        }
        })     
    }catch (error) {
        console.log('Error'+error)
        res.render('error_page')
    }
}




module.exports.profile = async(req,res)=>{

        if(!req.isAuthenticated())
            {
            return res.redirect('/login')
            }

            // res.render('profile',{
            //     title:'Profile Page',
            //     user:req.user
            // })
            return res.status(200).json({
            
                user:req.user,
                message: "Profile page delivered!"
            });
    }

module.exports.uploadDp = async(req,res)=>{


    if(!req.isAuthenticated())
        {
          return   res.redirect('/login')
        }

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
                if(user.dp[0]!='h')
                     fs.unlinkSync(path.join(__dirname,'..',user.dp))

               
                    let path1= User.dpPath+'/'+ req.file.filename
                    user.dp = path1
                    user.save()                
            }
            else
            {
                let path1= User.dpPath+'/'+ req.file.filename
                user.dp = path1
                user.save()
            }            
           }
        })     
        // return res.redirect('back')
        return res.status(200).json({
            photu:user.dp,
            message: "DP aa gya!"
        });
                    
    }catch (error) {
        console.log('Error'+error)
        res.redirect('back')
    }
}

