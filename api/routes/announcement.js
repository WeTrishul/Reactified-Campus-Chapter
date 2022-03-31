const express = require('express')
const passport = require('passport')
const router = new express.Router()
const announcementController = require('../controllers/AnnounceController')



router.get('/allAnnouncements',passport.checkAuthentication,announcementController.allAnnouncement)

router.post('/Announce',passport.checkAuthentication,announcementController.Announce)

router.post('/delAnnounce/:id',passport.checkAuthentication,announcementController.delAnnounce)



module.exports = router
