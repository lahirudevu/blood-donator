var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function(user, done) {
  	logger.info(user);
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	logger.debug(obj);
  	done(null, obj);
});

passport.use(new GoogleStrategy({
        "clientID": "383932440440-7nqrv64ub3fp4ghcigj9bjj21lqu1krk.apps.googleusercontent.com",
        "clientSecret": "_IpwR2UsdIr_T6W3RDvyBzY9",
        "callbackURL": "http://localhost:3001/auth/google/callback"
    },

  function(accessToken, refreshToken, profile, done) {

    // Typically you would query the database to find the user record
    // associated with this Google profile, then pass that object to the `done`
    // callback.
    return done(null, profile);
  }
));

export default {

    passport : passport
};