var express = require('express')
  , router = express.Router()
  , DB = require('../../config/DB');


router.get('/name/:id', function(req, res) {
	res.send('hi');
});

router.get('/create', function(req, res) {

	var user = {"first_name":"lahiru","last_name":"last_name"};
	DB.models.user.create(user).exec(function(error, model){
		res.send(model);
	});
});

module.exports = router;