const express = require('express')
const passport = require('passport')
const router = new express.Router()
const EventController = require('../controllers/Events')


router.get('/EventForm',EventController.eventform)
router.post('/CreateEvent',EventController.createevent)
module.exports = router