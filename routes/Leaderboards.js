const express = require('express')
const passport = require('passport')
const router = new express.Router()
const LeaderboardsController = require('../controllers/Leaderboards')


router.get('/Leaderboards',LeaderboardsController.leaderboards)


module.exports = router