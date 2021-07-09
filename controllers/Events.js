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

module.exports.eventform = (req,res)=>{
    res.render('EventForm')
}

module.exports.createevent = async (req,res)=>{
    
    try{

        await Event.create({
            creatorid:req.user._id,
            eventname:req.body.eventname,
            aboutevent:req.body.aboutevent,
            eventStartTime:req.body.eventStartTime,
            eventEndTime:req.body.eventEndTime,
            eventDate:req.body.eventDate   
        })

        return res.redirect('back')

    }catch(error)
    {
        console.log('some error occured')
    }
    

}

