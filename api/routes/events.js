const express = require('express')
const passport = require('passport')
const router = new express.Router()
const EventController = require('../controllers/Events')


router.get('/EventForm',EventController.eventform)

router.post('/CreateEvent',EventController.createevent)

router.get('/RegisterForEvent',EventController.registerForTheEvent)

router.get('/EditForm',EventController.editeventform)

router.post('/UpdateEvent',EventController.updateevent)

router.get('/DeleteEvent',EventController.deleteevent)

router.get('/EventPage/:eventname',EventController.eventpage)

module.exports = router