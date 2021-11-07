const path = require('path')
const multer = require('multer')
const Questions_PATH =path.join('/uploads/questionsetters/questions')



let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',Questions_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.pdf')
    }
  })

  module.exports = storage