const express = require('express')
const passport = require('passport')
const router = new express.Router()
const UserController = require('../controllers/user')
const UploadController = require('../controllers/upload')
const User = require('../models/user')

router.get('/signup',UserController.getsignup)
router.post('/signup/createuser',UserController.postsignup)
router.get('/login',UserController.getlogin)
router.post('/login/createsession',passport.authenticate(
    'local',
    {failureRedirect:'/login'}
    ),UserController.postlogin)

router.get('/dashboard',passport.checkAuthentication,UserController.dashboard)

router.get('/UpcomingEvents',passport.checkAuthentication,UserController.upcomingevents)

router.get('/logout',UserController.logout)

router.get('/fileupload',passport.checkAuthentication,UploadController.setQuestions)
router.post('/fileupload/setquestions/:id',UploadController.upload)




module.exports = router;