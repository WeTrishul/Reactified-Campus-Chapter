const express = require('express')
const passport = require('passport')
const router = new express.Router()
const UserController = require('../controllers/user')

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




module.exports = router;