var express = require('express')
  , router = express.Router()
  , api = require('../Api');

router.get('/name/:id', function(req, res) {
	api.models.user.sayhi(function(result){
		res.send(result);
	});
	//res.send('hi');
});

router.get('/create', function(req, res) {

	var user = {"first_name":"lahiru","last_name":"last_name"};
	api.models.user.create(user).exec(function(error, model){
		res.send(model);
	});
});

module.exports = router;