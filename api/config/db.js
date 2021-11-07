const mongoose=require('mongoose')
const Env = require('./environment')
// mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb://127.0.0.1:27017/${Env.db}`,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error',console.error.bind(console,'error connecting to database'))

db.once('open',()=>console.log('Connected to database :: MongoDB'))



module.exports= db