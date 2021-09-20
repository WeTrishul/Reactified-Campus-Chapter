const mongoose=require('mongoose')
const db = require('../config/db')
const path = require('path')
const multer = require('multer')
const multerStorage = require('../config/multerResources')
const Resources_PATH = path.join('/uploads/resources')


const resoursesSchema = new mongoose.Schema({
   dsa:[],
   cp:[],
   dev:[],
  apti:[],
  gate:[],
  coresub:[],
  placements:[] 
  })


resoursesSchema.statics.uploadedResources = multer({ storage: multerStorage,
  fileFilter: function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if(ext !== '.pdf') {
      return callback(new Error('Only Pdf is allowed'))
  }
  callback(null, true)
}
}).array('resources',100)

resoursesSchema.statics.resourcesPath = Resources_PATH


const resourses = mongoose.model('resourses', resoursesSchema)
module.exports = resourses
