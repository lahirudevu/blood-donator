import express from 'express';
import policies from '../policies/';

var router = express.Router();

/**
**This section binds the policies to relevant routes
**/
logger.info('loading the system policies');

router.all("*", policies.isAjax, function(req, res, next) {
  next();
});

// router.all("/user/*", policies.sessionAuth, policies.isCreator, function(req, res, next) {
//   next();
// });


/**
**
**This section defines routes
**/
logger.info('loading routes');
router.use('/user', require('./UserController'));
router.use('/auth', require('./AuthController'));
router.use('/request', require('./RequestController'));
router.use('/event', require('./EventController'));
router.use('/comment', require('./CommentController'));
router.use('/resource', require('./ResourceController'));
router.use('/maps', require('./MapsController'));

router.get('/', (req, res) => {
  res.render('index');
});

export default router;
