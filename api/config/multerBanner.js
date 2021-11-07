const path = require('path')
const multer = require('multer')
const BANNER_PATH =path.join('/uploads/eventbanner')



let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',BANNER_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.substr(6))
    }
  })

  module.exports = storage