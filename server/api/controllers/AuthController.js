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
  function(req, res) {
  	req.session.authenticated = true;
    res.send('authenticated');
  });

//for dev purposes only
router.get('/authenticated', function(req, res) {
  if (req.isAuthenticated()) {
    logger.info('authenticated');
    res.send('authenticated');
  }else{
  	logger.info('not authenticated');
    res.send('not authenticated');
  }
});

//destroy the session
router.get('/logout', (req, res) => {
	req.session.destroy();
	res.send('logout');
});

module.exports = router;