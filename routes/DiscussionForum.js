const express = require('express')
const passport = require('passport')
const router = new express.Router()
const DiscussController = require('../controllers/DiscussionForum')


router.get('/Discuss',DiscussController.discuss)

router.post('/postit',passport.checkAuthentication,DiscussController.postit)

router.post('/commentit',passport.checkAuthentication,DiscussController.commentit)

router.get('/destroypost/:id',passport.checkAuthentication,DiscussController.deletepost)

router.get('/destroycomment/:id',passport.checkAuthentication,DiscussController.deletecomment)

module.exports = router