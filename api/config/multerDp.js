const path = require('path')
const multer = require('multer')
const DP_PATH =path.join('/uploads/profilepic')



let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',DP_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.substr(6))
    }
  })

  module.exports = storage