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
    res.render('EventForm',{
        event:undefined
    })
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

        return res.redirect('/UpcomingEvents')

    }catch(error)
    {
        console.log('some error occured')
    }
    

}


module.exports.registerForTheEvent = async (req,res) =>{
    try{
        // console.log(req.query.id)
        var currevent= await Event.findById(req.query.id)
  
            currevent.Registeredusers.push(req.user._id)
            currevent.save()

      
        return res.redirect('/UpcomingEvents')
    }catch(error){
        console.log(req.query.id)
        return res.redirect('back')
    }
   
}

module.exports.editeventform = async (req,res) =>{
    
    var event = await Event.findById(req.query.id)

    res.render('EventForm',{
        event : event
    });
   
}

module.exports.updateevent = async(req,res)=>{
    try{
        
        var currevent= await Event.findByIdAndUpdate(req.body.id,{
            creatorid:req.user._id,
            eventname:req.body.eventname,
            aboutevent:req.body.aboutevent,
            eventStartTime:req.body.eventStartTime,
            eventEndTime:req.body.eventEndTime,
            eventDate:req.body.eventDate   
        })
  
        
      
        return res.redirect('/UpcomingEvents')

    }catch(error){
        console.log(error)
        return res.redirect('back')
    }
}


module.exports.deleteevent = async (req,res)=>{
    try{
    await Event.findByIdAndDelete(req.query.id)

    return res.redirect('/UpcomingEvents')

    }catch(error){
        console.log(error)
        return res.redirect('back')
    }

}

