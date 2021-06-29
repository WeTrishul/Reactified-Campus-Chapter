const passport =require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const User = require('../models/user')

let opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:'CampusChapter'
}

passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload._id, function(err, user) {
        if (err) {
           console.log('Error in finding user from Jwt')
           return
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport

// Need to add controller which will send the json web tokens to the front-end framework!!
//Forgot password facility is delayed.