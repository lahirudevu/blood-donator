import express from 'express';
import api  from '../Api';

var router = express.Router();

router.get('/name/:id', (req, res) => {
	models.user.sayhi(function(result){
		res.send(result);
	});
});

router.get('/create', (req, res) => {
	let user = {"first_name":"lahiru","last_name":"last_name"};

	models.user.create(user).exec( (error, model) => {
		res.send(model);
	});
});

module.exports = router;
