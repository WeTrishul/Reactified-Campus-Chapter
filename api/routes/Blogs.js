const express = require('express')
const passport = require('passport')
const router = new express.Router()
const BlogController = require('../controllers/Blogs')

router.get('/allblogs',BlogController.allblogs)

router.get('/writeblog',BlogController.blogform)

router.post('/saveblog',BlogController.saveblog)

router.get('/showblog/:id',BlogController.showblog)

router.get('/deleteblog/:id',passport.checkAuthentication,BlogController.deleteblog)

router.get('/editblog',passport.checkAuthentication,BlogController.editblogform)

router.post('/updateblog/:id',passport.checkAuthentication,BlogController.editblog)



module.exports = router