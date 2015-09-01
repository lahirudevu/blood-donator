var express = require('express')
  , router = express.Router()

router.use('/user', require('./UserController'));

router.get('/', function(req, res) {
  res.render('index')
});

module.exports = router