const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const user = require('../model/user');
passport.user(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURI:"http://localhost:5000/api/authgoogle/callback"
}, async(accessToken, refreshToken, profile, done) =>{
    let user = await user.findOne({googleId: profile.id});
    if(!user){
        user =new user({username:profile.displayName, googleId:profile.id});
        await user.save()
    }
    return done(null,user);
}

))