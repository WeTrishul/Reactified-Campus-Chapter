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
        // if(!req.isAuthenticated())
        // {
        //   return   res.redirect('/login')
        // }


        const leaderBoards = await Leaderboards.find({}).populate('userid').exec()

        
        // console.log(leaderBoards)
        //  res.render('Leaderboards',{
        //     leaderboard:leaderBoards
        // })

        return res.status(200).json({
            data: {
                title:'Dasboard',
            LeaderBoards : leaderBoards,
            
                
            },
            message: "Applied Successfully!"
        });

    } catch (error) {
        res.redirect('back')
    }

}