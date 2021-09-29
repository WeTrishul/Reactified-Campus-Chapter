const express = require('express')
const passport = require('passport')
const router = new express.Router()
const resourseController = require('../controllers/resourse')

router.get('/resourses/:category',passport.checkAuthentication,resourseController.getresoursePage)

router.get('/resources/upload',passport.checkAuthentication,resourseController.getuploadPage)
router.post('/resourses/:id',passport.checkAuthentication,resourseController.postresourses)

router.get('/deleteres/uploads/resources/:rid/:category/:foldername',passport.checkAuthentication,resourseController.deleteResource)


router.get('/resources/upload/:category',resourseController.createFolder)

router.get('/fileresources/:foldername',resourseController.showFilesFromResources)

module.exports=router