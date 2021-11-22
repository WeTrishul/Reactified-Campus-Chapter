const express = require('express')
const passport = require('passport')
const router = new express.Router()
const BlogController = require('../controllers/Blogs')

router.get('/allblogs',BlogController.allblogs)

router.get('/writeblog',BlogController.blogform)

router.post('/saveblog',BlogController.saveblog)

router.get('/showblog/:id',BlogController.showblog)

router.post('/deleteblog',BlogController.deleteblog)

router.get('/editblog',BlogController.editblogform)

router.post('/updateblog',BlogController.editblog)



module.exports = router