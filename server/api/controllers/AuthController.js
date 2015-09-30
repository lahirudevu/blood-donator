import express from 'express';
import bcrypt from 'bcrypt';

var router = express.Router();
router.use(passport.initialize());

router.get('/google',
  passport.authenticate('google', { scope: ['openid email profile'] }));

//google callback after authentication request
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
  	req.session.authenticated = true;
    req.session.user = req.user;
    res.redirect('/');
  });

//for dev purposes only
router.get('/authenticated', function(req, res) {
  if (req.isAuthenticated()) {
    logger.info('authenticated');
    logger.debug(req.session.user);
    res.send('authenticated');
  }else{
  	logger.info('not authenticated');
    res.send('not authenticated');
  }
});

router.get('/twitter',
  passport.authenticate('twitter'));

router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.authenticated = true;
    req.session.user = req.user;
    res.redirect('/');
  });


router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.authenticated = true;
    req.session.user = req.user;
    res.redirect('/');
  });

//destroy the session
router.get('/logout', (req, res) => {
	req.session.destroy();
	res.send('logout');
});

//normal login session
router.post('/login', (req, res) => {

  let loginData = req.body;
  models.user.findOne({email : loginData.email})
  .then(result=>{

      let user = result;
      let hashEqual = bcrypt.compareSync(loginData.password, user.password);

      if(hashEqual){

        delete user.password;
        req.session.authenticated = true;
        req.session.user = user;

        logger.info('normal user logged.');
        logger.debug(req.session.user);
        res.status(200).send({msg : "login success"});
      }else{
        res.status(400).send({msg : "invalid credentials"});
      }

  })
  .catch((error)=>{
    logger.error(error);
    res.status(400).send(error);
  });

});

module.exports = router;