const express = require('express')
const passport = require('passport')
const router = new express.Router()
const DiscussController = require('../controllers/DiscussionForum')


router.get('/Discuss',passport.checkAuthentication,DiscussController.discuss)

router.post('/postit',passport.checkAuthentication,DiscussController.postit)

router.post('/commentit',passport.checkAuthentication,DiscussController.commentit)

router.get('/destroypost/:id',passport.checkAuthentication,DiscussController.deletepost)

router.get('/destroycomment/:id',passport.checkAuthentication,DiscussController.deletecomment)

router.post('/Likehandler',DiscussController.likehandler)

router.post('/Reporthandler',DiscussController.reporthandler)

router.get('/ReportedThings',DiscussController.reportedthings)



module.exports = router
