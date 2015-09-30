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
        user.firstName = profile.name.familyName;
        user.lastName = profile.name.givenName;
        user.email = profile.emails[0].value;
        logger.info(user);
        break;

    case 'facebook':
        let nameTokens = profile.displayName.split(' ');
        user.firstName = nameTokens[0];
        user.lastName = nameTokens[nameTokens.length-1];
        logger.info(user);
        break;

    case 'twitter':
        let nametokens = profile.displayName.split(' ');
        user.firstName = nametokens[0];
        user.lastName = nametokens[nametokens.length-1];
        logger.info(user);
        break;

  }

  return user;
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

    let usrobj = getProfileUser(profile);
    usrobj.googleId = profile.id;

    models.user.find({googleId : usrobj.googleId})
    .then(result=>{
      if(result.length>0){
        logger.info('user found..');
      }else{
        logger.info('creating user..');
        models.user.create(usrobj)
        .then(result=>{
          logger.debug(result);
        });
      }
    })
    .catch(error=>{
        logger.error(error);
    });


    return done(null, profile);
  }
));

passport.use(new TwitterStrategy(
  serverConfigs.twitter,
  function(token, tokenSecret, profile, done) {

    let usrobj = getProfileUser(profile);
    usrobj.twitterId = profile.id;

    models.user.find({twitterId : usrobj.twitterId})
    .then(result=>{
      if(result.length>0){
        logger.info('user found..');
      }else{
        logger.info('creating user..');
        models.user.create(usrobj)
        .then(result=>{
          logger.debug(result);
        });
      }
    })
    .catch(error=>{
        logger.error(error);
    });
    return done(null, profile);
  }
));

//reference - https://www.npmjs.com/package/passport-facebook
passport.use(new FacebookStrategy(
  serverConfigs.facebook,
  function(token, refreshToken, profile, done) {

     let usrobj = getProfileUser(profile);
     usrobj.facebookId = profile.id;

    models.user.find({facebookId : usrobj.facebookId})
    .then(result=>{
      if(result.length>0){
        logger.info('user found..');
      }else{
        logger.info('creating user..');
        models.user.create(usrobj)
        .then(result=>{
          logger.debug(result);
        });
      }
    })
    .catch(error=>{
        logger.error(error);
    });
    return done(null, profile);
  }
));

export default {
    passport : passport
};