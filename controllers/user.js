const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')
const fetch = require('node-fetch')
const moment = require('moment')
const startingTime = require('../config/timecalc')




module.exports.getlogin=(req,res)=>{

    if(req.isAuthenticated())
    {
    res.redirect('/dashboard')  
    }
else
{
    res.render('login',{
        title:'login'
    })
}
}

module.exports.postlogin = (req,res)=>{
    res.redirect('/dashboard')
}

module.exports.getsignup = (req,res)=>{

if(req.isAuthenticated())
{
  res.redirect('/dashboard')  
}
else
{
    res.render('signup',{
        title:'signup'
    })
}

}

module.exports.postsignup = async (req,res)=>{

    
        const user = new User(req.body)

        try {
            await user.save()
            console.log('User created successfully')
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            res.redirect('back')
        }
    }
    

module.exports.dashboard = async (req,res)=>{
    try {
                
        res.render('dashboard',{
            title:'Dasboard'
        })
       
        
    } catch (error) {
        console.log(error)
    }
    
}

module.exports.upcomingevents = async (req,res)=>{
    try {
        const UpcomingEvents = await fetch('https://codeforces.com/api/contest.list').then(response => response.json());

        const arr=[]
        UpcomingEvents.result.forEach(event => {
            if(event.phase !=="FINISHED" && event.phase !=="PENDING_SYSTEM_TEST")
            {
                event.startTimeSeconds=startingTime(event.startTimeSeconds)
                arr.push(event)
            }            
        });
        const arr1 = arr.reverse()
        const eventsArray = arr
        
        res.render('UpcomingEvents',{
            result: eventsArray
        })
       
        
    } catch (error) {
        console.log(error)
    }
}

module.exports.logout = (req,res)=>{
        
    req.logout();
  res.redirect('/login');
}



