var express = require('express')
  , router = express.Router()
  , User = require('../models/User');

router.get('/:id', function(req, res) {
	User.getName(function(name){
		res.send(name);
	});
});

module.exports = router;