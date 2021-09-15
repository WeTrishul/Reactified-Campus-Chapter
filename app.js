const express = require('express')
const session = require('express-session')
const ejs = require('ejs')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const UserRouter = require('./routes/user')
const DiscussRouter = require('./routes/DiscussionForum')
const LeaderboardsRouter = require('./routes/Leaderboards')
const EventRouter = require('./routes/events')
const TeamChatRouter = require('./routes/TeamChat')
const BlogsRouter = require('./routes/Blogs')
const passport = require('passport')
const passport_local = require('./config/passport-local-auth')
const passportGoogle = require('./config/passport-google-oauth2.0-strategy')
const passportJWT = require('./config/passport-jwt-strategy')
const db = require('./config/db')
const MongoStore = require('connect-mongo')
const RatingsHandler = require('./config/RatingsHandler')
const pollRouter = require('./routes/Polling')
const cors = require('cors')



const app=express()
app.use(cors({
    origin:'*'
}))



const port=process.env.PORT || 3000
//app.use(express.json())


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())


app.set('view engine','ejs')
app.set('views','./views')


app.use(session({
    name: 'CodechefCampusChapter',
    secret: 'blahblahblah..',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/CodeChefCampusChapter',
        autoRemove:'disabled',
    },
    function(err)
    {
        console.log(err||'connect-mongodb setup ok')
    })
}))

/*app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/test-app' })
})) */

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

app.use(express.static('./assets'))
app.use(EventRouter)

app.use(UserRouter)
app.use(DiscussRouter)
app.use(LeaderboardsRouter)
app.use(TeamChatRouter)
app.use(pollRouter)
app.use(BlogsRouter)

app.use('/uploads',express.static(__dirname + '/uploads'))


const ChatServer = require('http').Server(app)
const ChatSocket = require('./config/chatsocket').chat(ChatServer)

ChatServer.listen(5000)



app.listen(port,()=>{

   

    setInterval( async ()=>{
        // RatingsHandler.getRatings({codeforces:'coder_hk47'})
        const k = await RatingsHandler.updateRatingsOfAllUsers()
        
        setTimeout(() => RatingsHandler.updateLeaderboards(), 60000) 
    }, 604800000);
    

    console.log('Server is up on port '+ port)
})