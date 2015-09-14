import express from 'express';

var router = express.Router();
var sessionAuth = require('../policies/sessionAuth');

/**
**This section binds the policies to relevant routes
**/
logger.info('loading the system policies');
router.all("/user/*", sessionAuth, function(req, res, next) {
  next();
});




/**
**
**This section defines routes
**/
logger.info('loading routes');
router.use('/user', require('./UserController'));
router.use('/request', require('./RequestController'));

router.get('/', (req, res) => {
  res.render('index');
});

export default router;
