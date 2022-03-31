const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const Announcements = require('../models/Announcement')
const passport =require('passport')
const passport_local = require('../config/passport-local-auth')

module.exports.allAnnouncement= async (req,res)=>{


    try {
        // if(!req.isAuthenticated())
        // {
        //   return   res.redirect('/login')
        // }
        const Announcement = await Announcements.find({}).populate('userid','username UserType dp').exec()

        return res.status(200).json({
            data: Announcement,
            msg:"success"
        });

    } catch (error) {
        console.log(error)
        res.redirect('back')
    }

}


module.exports.Announce = async(req,res) =>{

    try {
        // if(!req.isAuthenticated())
        // {
        //   return   res.redirect('/login')
        // }

      const  Announce = await Announcements.create(req.body);


        return res.status(200).json({
            data: Announce,
            msg:"success"
        });

    } catch (error) {
        res.redirect('back')
    }

}




module.exports.delAnnounce = async(req,res) =>{

    try {
        // if(!req.isAuthenticated())
        // {
        //   return   res.redirect('/login')
        // }

        const announceId = req.params.id;

        const a = await Announcements.findByIdAndDelete(announceId);

        return res.status(200).json({
            msg:"Done"
        });

    } catch (error) {
        res.redirect('back')
    }

}