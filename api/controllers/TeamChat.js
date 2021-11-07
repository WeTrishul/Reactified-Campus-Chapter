const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Post = require('../models/post')
const Like=require('../models/like')
const Comment = require('../models/comments')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')
const fetch = require('node-fetch')
const moment = require('moment')
const startingTime = require('../config/timecalc')

module.exports.teamchatpage = (req,res) =>{

         if(!req.isAuthenticated())
            {
                return   res.redirect('/login')
            }

   if(req.user.UserType=='Admin' || req.user.UserType=='Executive'||
   req.user.UserType=='MediaLead' || req.user.UserType=='EventsLead')
   {
      return res.render('TeamChat')
   }
   
}

module.exports.executiveschatpage = (req,res) =>{

   if(!req.isAuthenticated())
   {
     return   res.redirect('/login')
   }

   if(req.user.UserType=='Admin' || req.user.UserType=='Executive'||
   req.user.UserType=='MediaLead' || req.user.UserType=='EventsLead')
      {
      return res.render('executivechat')
      }
}

module.exports.leadschatpage = (req,res) =>{

      if(!req.isAuthenticated())
        {
          return   res.redirect('/login')
        }


   if(req.user.UserType=='Admin' || 
   req.user.UserType=='MediaLead' || req.user.UserType=='EventsLead')
   {
      return res.render('coreteamchat')
   }
}