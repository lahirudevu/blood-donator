import express from 'express';

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

module.exports = router;