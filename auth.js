const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy

const GOOGLE_CLIENT_ID = '157043472033-ng2rb7vbldgkpa9ubrgaiult5m2k55pa.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'O24nIX57DafpUra59Kjtj_c4';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true

},
function(request, accessToken, refreshToken, profile, done){
        return done(null, profile)
}

))
passport.serializeUser(function(user, done){
    done(null, user)
})

passport.deserializeUser(function(user, done){
    done(null, user)
})