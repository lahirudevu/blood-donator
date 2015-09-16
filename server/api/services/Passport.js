import passport from 'passport';
var serverConfigs = require('../../config');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function(user, done) {
  	logger.info(user);
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	logger.debug(obj);
  	done(null, obj);
});

passport.use(new GoogleStrategy(
  serverConfigs.google,
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