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
const request = require('request')
module.exports.eventform = (req,res)=>{
    res.render('EventForm',{
        event:undefined
    })
}

module.exports.createevent = async (req,res)=>{
    
    try{
        // console.log(req.file.filename)

        
        var dest
      Event.uploadBanner(req,res,async function(error){

        console.log(req.body)

        try {

            if(error)
            {
                console.log('Error aaya '+error)
                
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
           if(req.file)
           { 
               let path = Event.bannerPath+'/'+ req.file.filename+','   
                var LastIndexOfComma = path.lastIndexOf(',')
                path = path.substr(0,LastIndexOfComma)
                dest = path
                console.log('HI')   
           }
          const eve =  await Event.create({
            creatorid:req.user._id,
            eventname:req.body.eventname,
            aboutevent:req.body.aboutevent,
            eventStartTime:req.body.eventStartTime,
            eventEndTime:req.body.eventEndTime,
            eventDate:req.body.eventDate,
            eventbanner: dest  
        })

        if (req.body.flag){
                
            console.log('yahan aagya')
            return res.status(200).json({
                data: {
                    done: 'yes',
                    eventid:eve._id,
                    eventname:eve.eventname,
                    eventdate:eve.eventDate
                },
                message: "uploaded!"
            });
        }
            
        } catch (error) {

            console.log(error)
            return res.redirect('/UpcomingEvents')
            
        }
           
        // return res.redirect('/UpcomingEvents')
        })   


        

        

    }catch(error)
    {
        console.log('some error occured' + error)
        res.redirect('/UpcomingEvents')
    }
    

}


module.exports.registerForTheEvent = async (req,res) =>{
    try{
        // console.log(req.query.id)
        var currevent= await Event.findById(req.query.id)
        
        var arr = []

        arr = currevent.Registeredusers

        if(arr.includes(req.user._id))
        {
            return res.redirect('/UpcomingEvents')
        }
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
        
       

        Event.uploadBanner(req,res,async(error)=>{

            
            if(error)
            {
                console.log('Some error : '+error)  
            }

            var currevent= await Event.findByIdAndUpdate(req.body.id,{
                creatorid:req.user._id,
                eventname:req.body.eventname,
                aboutevent:req.body.aboutevent,
                eventStartTime:req.body.eventStartTime,
                eventEndTime:req.body.eventEndTime,
                eventDate:req.body.eventDate   
            })
           if(req.file)
           { 

                    fs.unlinkSync(path.join(__dirname,'..',currevent.eventbanner))
                    let path1= Event.bannerPath+'/'+ req.file.filename
                    currevent.eventbanner = path1
                    currevent.save()                
            }
                   
           
        return res.redirect('/UpcomingEvents')
        })     

     

    }catch(error){
        console.log(error)
        return res.redirect('back')
    }
}


module.exports.deleteevent = async (req,res)=>{
    try{

    var currevent = await Event.findById(req.query.id,(error,eve)=>{
        console.log(eve.eventname)
        fs.unlinkSync(path.join(__dirname,'..',eve.eventbanner))
        eve.remove()
        return res.redirect('/UpcomingEvents')
    })
    
    // await Event.findByIdAndDelete(req.query.id)
  

    

    }catch(error){
        console.log(error)
        return res.redirect('back')
    }

}


module.exports.eventpage = async (req,res) =>{
    console.log(req.params.eventname)
    var curreve = await Event.findOne({eventname:req.params.eventname})

    return res.render('EventPage',{
        event:curreve
    })
}
