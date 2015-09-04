import express from 'express';

var router = express.Router();

logger.info('loading routes');

router.use('/user', require('./UserController'));

router.get('/', (req, res) => {
  res.render('index')
});

export default router;
