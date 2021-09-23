const express = require('express')
const passport = require('passport')
const router = new express.Router()
const UserController = require('../controllers/user')
const UploadController = require('../controllers/upload')
const codechef = require('../config/codeChef')
const CodechefController = require('../controllers/CodechefController')
const fetch = require('node-fetch')
const applyController = require('../controllers/applyController')

//Applicant point of view

router.get('/applyform',passport.checkAuthentication,applyController.viewApplyForm)
router.post('/applied/:id',passport.checkAuthentication,applyController.appliedForm)

//Admin Routes
router.get('/applications',passport.checkAuthentication,applyController.viewApplications)
router.post('/accept/:id',passport.checkAuthentication,applyController.accept)
router.post('/reject/:id',passport.checkAuthentication,applyController.reject)
