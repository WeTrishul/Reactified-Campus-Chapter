const express = require('express')
const passport = require('passport')
const router = new express.Router()
const resourseController = require('../controllers/resourse')

router.get('/resourses/:category',passport.checkAuthentication,resourseController.getresoursePage)

router.get('/resources/upload',passport.checkAuthentication,resourseController.getuploadPage)
router.post('/resourses/:id',passport.checkAuthentication,resourseController.postresourses)


module.exports=router