const express = require('express')
const passport = require('passport')
const router = new express.Router()
const TeamChatController = require('../controllers/TeamChat')

router.get('/executiveteamchat',TeamChatController.teamchatpage)

router.get('/executivechat',TeamChatController.executiveschatpage)

router.get('/coreteam',TeamChatController.leadschatpage)

module.exports = router