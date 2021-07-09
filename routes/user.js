const express = require('express')
const passport = require('passport')
const router = new express.Router()
const UserController = require('../controllers/user')
const UploadController = require('../controllers/upload')

const User = require('../models/user')


router.get('/fileupload',passport.checkAuthentication,UploadController.setQuestions)
router.post('/fileupload/setquestions/:id',UploadController.upload)
router.get('/profilepage',passport.checkAuthentication,UploadController.profile)
router.post('/profilepage/setdp/:id',UploadController.uploadDp)
router.get('/profilepage/:username',UserController.othersProfile)


router.get('/signup',UserController.getsignup)
router.post('/signup/createuser',UserController.postsignup)
router.get('/login',UserController.getlogin)
router.post('/login/createsession',passport.authenticate(
    'local',
    {failureRedirect:'/login'}
    ),UserController.postlogin)

router.get('/users/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/users/auth/google/callback',passport.authenticate('google',{failureRedirect:'/signup'}),UploadController.profile)


router.get('/dashboard',passport.checkAuthentication,UserController.dashboard)

router.get('/UpcomingEvents',passport.checkAuthentication,UserController.upcomingevents)


router.get('/logout',UserController.logout)



router.post('/update/coderhandles/:email',UserController.updatecoderhandles)

router.get('/forgot-password',UserController.forgotPasswordView)
router.post('/forgot-password',UserController.forgotPassword)
router.get('/reset/password/:token',UserController.changePasswordPage)
router.post('/reset/password/:token',UserController.changePassword)









module.exports = router;