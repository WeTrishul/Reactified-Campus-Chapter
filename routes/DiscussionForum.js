const express = require('express')
const passport = require('passport')
const router = new express.Router()
const DiscussController = require('../controllers/DiscussionForum')


router.get('/Discuss',DiscussController.discuss)

router.post('/postit',DiscussController.postit)

router.post('/commentit',DiscussController.commentit)

module.exports = router