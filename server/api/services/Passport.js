import passport from 'passport';
var serverConfigs = require('../../config');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

//extracts the user object from social login
function getProfileUser(profile){

  let user = {};

  switch(profile.provider) {

    case 'google':
        user.id = profile.id;
        user.firstName = profile.name.familyName;
        user.lastName = profile.name.givenName;
        user.email = profile.emails[0].value;
        logger.info(user);
        break;

    case 'facebook':
        user.id = profile.id;
        let nameTokens = profile.displayName.split(' ');
        user.firstName = nameTokens[0];
        user.lastName = nameTokens[nameTokens.length-1];
        logger.info(user);
        break;

    case 'twitter':
        user.id = profile.id;
        let nametokens = profile.displayName.split(' ');
        user.firstName = nametokens[0];
        user.lastName = nametokens[nametokens.length-1];
        logger.info(user);
        break;

  }
}

passport.serializeUser(function(user, done) {
  	//logger.info(user);
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
  	done(null, obj);
});

passport.use(new GoogleStrategy(
  serverConfigs.google,
  function(accessToken, refreshToken, profile, done) {
    getProfileUser(profile);
    return done(null, profile);
  }
));

passport.use(new TwitterStrategy(
  serverConfigs.twitter,
  function(token, tokenSecret, profile, done) {
    getProfileUser(profile);
    return done(null, profile);
  }
));

//reference - https://www.npmjs.com/package/passport-facebook
passport.use(new FacebookStrategy(
  serverConfigs.facebook,
  function(token, refreshToken, profile, done) {
     getProfileUser(profile);
    return done(null, profile);
  }
));

export default {
    passport : passport
};