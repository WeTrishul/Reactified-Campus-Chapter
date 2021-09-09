const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Event = require('../models/events')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')
const fetch = require('node-fetch')
const moment = require('moment')
const startingTime = require('../config/timecalc')
const multer = require('multer')
const path=require('path')
const fs =require('fs')



module.exports.allblogs = async (req,res) =>{
    res.render('Allblogs')
}

module.exports.blogform = async (req,res) =>{
    res.render('blogform')
}

module.exports.saveblog = async (req,res) =>{
    // console.log(req.body)

    res.send(req.body.content)
}