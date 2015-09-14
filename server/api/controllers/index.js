import express from 'express';
import policies from '../policies/';

var router = express.Router();

/**
**This section binds the policies to relevant routes
**/
logger.info('loading the system policies');
router.all("/user/*", policies.sessionAuth, policies.isCreator, function(req, res, next) {
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
