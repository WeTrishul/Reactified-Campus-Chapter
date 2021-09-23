const cookieParser = require('cookie-parser');
const express = require('express')
const db = require('../config/db')
const mongoose = require('mongoose')
const User = require('../models/user')
const Event = require('../models/events')
const Blog = require('../models/blog')
const Post = require('../models/post')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')
const fetch = require('node-fetch')
const moment = require('moment')
const startingTime = require('../config/timecalc')
const passportLocal=require('../config/passport-local-auth')
const forgot = require('../mailers/forgotPassword_mailer')
const multer = require('multer')
const path=require('path')
const fs =require('fs')
const queue = require('../config/kue')
const otpWorkers = require('../workers/otp_workers')
const globaleventsmethods = require('../config/GlobaleventMethods')
const Hackerrank = require('../config/Hackerank')
const resourses = require('../models/resourses')
const upcomingEvents = require('../models/UpcomingEvents')
const apply = require('../models/apply')


module.exports.viewApplyForm =async (req,res)=>{

    try {
        res.render('ApplicationForm',)
    } catch (error) {
        res.render('error_page')
    }
    
}

module.exports.appliedForm=async (req,res)=>{
    const id =req.params.id
    const user = await apply.find({userid:id})
    console.log('appliedForm user',user)
    try {
        if(!user)
        {
           const appliedData = await new apply(req.body)
        }
    } catch (error) {
        res.render('error_page')
    }
}

module.exports.viewApplications = async(req,res)=>{
    const AllUsers = await apply.find({}).populate('userid')

    try {
        res.render('ViewApplication',{
            arr:AllUsers,
            l=AllUsers.length
        })
    } catch (error) {
        res.render('error_page')
    }
}


module.exports.accept = async(req,res)=>{
    const id = req.params.id
    const appliedUser =  await User.findById({id})
    const role=req.body.role

    try {
        if(appliedUser.UserType==='Student')
        {
            appliedUser.UserType=role;
            await appliedUser.save()

            const selectedUser = await apply.deleteOne({userid:id})
            console.log(selectedUser)

            res.redirect('back')
        }
    } catch (error) {
        res.render('error_page')
        console.log('error_page')
    }
}

module.exports.reject = async(req,res)=>{
    const id = req.params.id
    const appliedUser =  await User.findById({id})
    const role=req.body.role

    try {
        if(appliedUser.UserType==='Student')
        {
            const selectedUser = await apply.deleteOne({userid:id})
            console.log(selectedUser)

            res.redirect('back')
        }
    } catch (error) {
        res.render('error_page')
        console.log('error_page')
    }
}

