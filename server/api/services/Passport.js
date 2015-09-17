import passport from 'passport';
var serverConfigs = require('../../config');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

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

passport.use(new TwitterStrategy(
  serverConfigs.twitter,
  function(token, tokenSecret, profile, done) {
    // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));

//reference - https://www.npmjs.com/package/passport-facebook
passport.use(new FacebookStrategy(
  serverConfigs.facebook,
  function(token, refreshToken, profile, done) {

/*use commented code to implementing facebook user login
    // asynchronous
    process.nextTick(function() {

        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
                return done(err);

            // if the user is found, then log them in
            if (user) {
                return done(null, user); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                var newUser            = new User();

                // set all of the facebook information in our user model
                newUser.facebook.id    = profile.id; // set the users facebook id
                newUser.facebook.token = token; // we will save the token that facebook provides to the user
                newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                // save our user to the database
                newUser.save(function(err) {
                    if (err)
                        throw err;

                    // if successful, return the new user
                    return done(null, newUser);
                });
            }

        });
    });*/
    return done(null, profile);

  }
));

export default {
    passport : passport
};