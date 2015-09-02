var express = require('express')
  , router = express.Router();

  console.log('loading routes');

router.use('/user', require('./UserController'));

router.get('/', function(req, res) {
  res.render('index')
});

module.exports = router;