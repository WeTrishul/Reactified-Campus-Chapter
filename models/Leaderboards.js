const mongoose=require('mongoose')
const db = require('../config/db')


LeaderboardsSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    CurrentRating:{
        type:String

    }
})

const Leaderboards = mongoose.model('Leaderboards',LeaderboardsSchema)

module.exports = Leaderboards