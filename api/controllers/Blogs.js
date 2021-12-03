const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Event = require('../models/events')
const Blog = require('../models/blog')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')
const fetch = require('node-fetch')
const moment = require('moment')
const startingTime = require('../config/timecalc')
const multer = require('multer')
const path=require('path')
const fs =require('fs')



module.exports.allblogs = async (req,res) =>{

    try {

        // if(!req.isAuthenticated())
        // {
        //   return   res.redirect('/login')
        // }

        const allblogs = await Blog.find({}).populate('userid')
       
       
        // res.render('Allblogs',{
            
        //     allblogs
        // })
        return res.status(200).json({
            data: {
                done:"yes",
                blogs:allblogs
            },
            message: "Applied Successfully!"
        });


    } catch (error) {
        console.log(error)
        res.render('error_page')
    }
    
}

module.exports.blogform = async (req,res) =>{

    // if(!req.isAuthenticated())
    // {
    //   return   res.redirect('/login')
    // }

    // res.render('blogform',{
    //     blog:undefined
    // })
    return res.status(200).json({
        blogs:undefined
        // data: {
        //     done:"yes",
        //     blogs:undefined
        // },
        // message: "Applied Successfully!"
    });
}

module.exports.editblogform = async (req,res) =>{

    try {

        if(!req.isAuthenticated())
        {
          return   res.redirect('/login')
        }

        const blog = await Blog.findById(req.query.id,req.body)
        
        // res.render('blogform',{blog})
        return res.status(200).json({
            blog
            
        });

    } catch (error) {

        res.render('back')

    }
}

module.exports.saveblog = async (req,res) =>{
    // console.log(req.body)

    try {

        // if(!req.isAuthenticated())
        // {
        //   return   res.redirect('/login')
        // }

        await Blog.create(req.body)
        return res.status(200).json({
            
            message: "Applied Successfully!"
        });
        // res.redirect('/Allblogs')
    } catch (error) {
        res.render('back')
    }
  
}

module.exports.showblog = async (req,res) =>{
    try {

        // if(!req.isAuthenticated())
        // {
        //   return   res.redirect('/login')
        // }

        const blog = await Blog.findById(req.params.id).populate('userid')
        
        console.log(blog)
    //    res.render('BlogPage',{blog})

    return res.status(200).json({
        blogs:blog
        
    });

    // res.send(blog.content)
    } catch (error) {
        res.render('error_page')
    }
}


module.exports.deleteblog =  async (req,res) =>{
    try {

        console.log(req.body)

        // if(!req.isAuthenticated())
        // {
        //   return   res.redirect('/login')
        // }
       
        const blog = await Blog.findById(req.body.blogid)

        console.log(blog)
        if(req.body.userid==blog.userid)
        {
            await blog.remove()
           
        }
        // res.redirect('/Allblogs')
        console.log("delete ho gya")
        return res.status(200).json({
            
            message: "Deleted Successfully!"
        });

    // res.send(blog.content)
    } catch (error) {
        console.log("error aaya")
        res.render('error_page')
    }
}



module.exports.editblog =  async (req,res) =>{
    try {

        // res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

        // if(!req.isAuthenticated())
        // {
        //   return   res.redirect('/login')
        // }
       
        const blog = await Blog.findByIdAndUpdate(req.params.id,req.body)
        blog.save()

        return res.status(200).json({
            
            message: "Edited Successfully!"
        });

        // res.redirect('/Allblogs')

    // res.send(blog.content)
    } catch (error) {
       res.redirect('back')
    }
}


