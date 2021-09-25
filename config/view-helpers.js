const Env = require('./environment')
const fs = require('fs')
const path = require('path')

module.exports = (app)=>{
    app.locals.assetpath = function(filePath){
        if(Env.name=='development'){
            return filePath
        }

        return '/'+ JSON.parse(fs.readFileSync(path.join(__dirname,'../public/rev-manifest.json')))[filePath]
    }
}