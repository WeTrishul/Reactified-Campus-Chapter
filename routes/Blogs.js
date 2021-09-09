const express = require('express')
const passport = require('passport')
const router = new express.Router()
const BlogController = require('../controllers/Blogs')

router.get('/allblogs',BlogController.allblogs)

router.get('/writeblog',passport.checkAuthentication,BlogController.blogform)

router.post('/saveblog',passport.checkAuthentication,BlogController.saveblog)



module.exports = router