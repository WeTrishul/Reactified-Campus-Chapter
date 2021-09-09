const express = require('express')
const passport = require('passport')
const router = new express.Router()
const BlogController = require('../controllers/Blogs')

router.get('/allblogs',BlogController.allblogs)

router.get('/writeblog',passport.checkAuthentication,BlogController.blogform)

router.post('/saveblog',passport.checkAuthentication,BlogController.saveblog)

router.get('/showblog/:id',BlogController.showblog)

router.get('/deleteblog/:id',passport.checkAuthentication,BlogController.deleteblog)

module.exports = router