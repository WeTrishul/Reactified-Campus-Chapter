const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comments')
const Leaderboards = require('../models/Leaderboards')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')
const fetch = require('node-fetch')
const moment = require('moment')
const startingTime = require('../config/timecalc')

module.exports.leaderboards= async (req,res)=>{


    try {
        const leaderBoards = await Leaderboards.find({}).populate('userid').exec()

        
        console.log(leaderBoards)
         res.render('Leaderboards',{
            leaderboard:leaderBoards
        })

    } catch (error) {
        res.redirect('back')
    }


    /*Leaderboards.find({}).populate('userid').exec((error,lboards)=>{
        return res.render('Leaderboards',{
            leaderboard:lboards
        })
    })*/

}