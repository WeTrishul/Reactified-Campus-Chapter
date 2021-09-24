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
        res.render('ApplicationForm')
    } catch (error) {
        res.render('error_page')
    }
    
}

module.exports.appliedForm=async (req,res)=>{
    try {
    console.log(req.body)
    const id =req.params.id
    // console.log(id)
    const user = await apply.find({userid:req.user._id})
    console.log('appliedForm user',user)
    
    
        if(user.length==0)
        {
        //    const appliedData = await new apply(req.body)

        const appliedData = await apply.create({
            userid : req.user._id,
            appliedRole : req.body.appliedRole,
            reason:req.body.reason,
            link1:req.body.link1

        })

        console.log(appliedData)

        if (req.xhr){
            
            const ajaxdata = await appliedData.populate('userid').execPopulate();
            return res.status(200).json({
                data: {
                    done:"yes",
                    applyreq: ajaxdata
                },
                message: "Applied Successfully!"
            });
        }

        }

        else{
            console.log('Hi')

        if (req.xhr){
            
            
            return res.status(200).json({
                data: {
                    done: 'no'
                },
                message: "Ekbar apply krke shaanti nhi h ?"
            });
        }

        }
    } catch (error) {
        res.render('error_page' + error)
    }
}

module.exports.viewApplications = async(req,res)=>{
    const AllUsers = await apply.find({}).populate('userid')

    try {
        res.render('ViewApplication',{
            arr:AllUsers,
            l:AllUsers.length
        })
    } catch (error) {
        res.render('error_page')
    }
}


module.exports.accept = async(req,res)=>{
    const id = req.params.id
    const appliedUser =  await User.findById(id)
    const role=req.params.role

    // console.log(appliedUser)
    try {
        if(appliedUser.UserType=='Student')
        {
            console.log('done')
            appliedUser.UserType=role;
            await appliedUser.save()

            const selectedUser = await apply.deleteOne({userid:id})
            console.log(selectedUser)

            if (req.xhr){
                console.log('aagya')
                return res.status(200).json({
                    data: {
                        done:"yes",
                        role : role,
                        username:appliedUser.username,
                        rolereqid: req.params.id
                    },
                    message: "user accepted"
                });
            }

            res.redirect('back')
        }
        else{


            if (req.xhr){
                console.log('aagya')
                return res.status(200).json({
                    data: {
                        done:"no",
                        rolereqid: req.params.id
                    },
                    message: "user accepted"
                });
            }
            console.log('bhak bey')
        }
    } catch (error) {
        res.render('error_page')
        console.log('error_page')
    }
}

module.exports.reject = async(req,res)=>{
    const id = req.params.id
    const appliedUser =  await User.findById(id)
    // const role=req.body.role
    try {
            const selectedUser = await apply.deleteOne({userid:id})

            if (req.xhr){
                console.log('aagya')
                return res.status(200).json({
                    data: {
                        rolereqid: req.params.id

                    },
                    message: "user deleted"
                });
            }

            // res.redirect('back')
    } catch (error) {
        res.render('error_page')
        console.log('error_page')
    }
}

