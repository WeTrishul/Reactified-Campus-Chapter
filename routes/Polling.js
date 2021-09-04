const express = require('express')
const passport = require('passport')
const router = new express.Router()
const pollController = require('../controllers/poll')


router.get('/poll',pollController.getPoll);
router.post('/poll/createpoll',pollController.savePoll);

router.get('/viewPagePoll/:id',passport.checkAuthentication,pollController.showPollPage)
router.post('/poll/sendpoll/:id',pollController.storeUserResponse)//passport.checkAuthentication


router.post('/viewAllPolls',pollController.showAllPolls)

module.exports  = router