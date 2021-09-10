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
        const allblogs = await Blog.find({}).populate('userid')
       
       
        res.render('Allblogs',{
            
            allblogs
        })


    } catch (error) {
        console.log(error)
        res.redirect('back')
    }
    
}

module.exports.blogform = async (req,res) =>{
    res.render('blogform',{
        blog:undefined
    })
}

module.exports.editblogform = async (req,res) =>{

    try {

        const blog = await Blog.findById(req.query.id,req.body)
        
        res.render('blogform',{blog})

    } catch (error) {

        console.log(error)

    }
    


}

module.exports.saveblog = async (req,res) =>{
    // console.log(req.body)

    try {
        await Blog.create(req.body)
        res.redirect('/Allblogs')
    } catch (error) {
        console.log(error)
    }
   
    
}

module.exports.showblog = async (req,res) =>{
    try {
        const blog = await Blog.findById(req.params.id).populate('userid')
        
        console.log(blog)
       res.render('BlogPage',{blog})

    // res.send(blog.content)
    } catch (error) {
        console.log(error)
    }
}


module.exports.deleteblog =  async (req,res) =>{
    try {
       
        const blog = await Blog.findById(req.params.id)
        if(req.user.id==blog.userid)
        {
            await blog.remove()
           
        }
        res.redirect('/Allblogs')

    // res.send(blog.content)
    } catch (error) {
        console.log(error)
    }
}



module.exports.editblog =  async (req,res) =>{
    try {
       
        const blog = await Blog.findByIdAndUpdate(req.params.id,req.body)
        blog.save()
        res.redirect('/Allblogs')

    // res.send(blog.content)
    } catch (error) {
        console.log(error)
    }
}


