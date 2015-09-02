var express = require('express')
  , router = express.Router()
  , User = require('../models/User');

router.get('/name/:id', function(req, res) {
	User.getName(function(name){
		res.send(name);
	});
});

router.get('/create', function(req, res) {

	var user = {"first_name":"lahiru","last_name":"last_name"};
	models.user.create(user).exec(function(error, model){
		res.send(model);
	});
});

module.exports = router;