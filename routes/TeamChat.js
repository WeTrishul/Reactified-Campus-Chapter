const express = require('express')
const passport = require('passport')
const router = new express.Router()
const TeamChatController = require('../controllers/TeamChat')

router.get('/teamchat',passport.checkAuthentication,TeamChatController.teamchatpage)

router.get('/executivechat',passport.checkAuthentication,TeamChatController.executiveschatpage)

router.get('/coreteam',passport.checkAuthentication,TeamChatController.leadschatpage)

module.exports = router