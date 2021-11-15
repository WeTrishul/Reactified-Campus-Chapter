const path = require('path')
const multer = require('multer')
const Resources_PATH =path.join('/uploads/resources')



let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',Resources_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.pdf')
    }
  })

  module.exports = storage