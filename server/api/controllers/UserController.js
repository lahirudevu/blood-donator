import express from 'express';
import api  from '../Api';
import User from '../models/User';

var router = express.Router();
// var user = new User._model();

router.get('/name/:id', (req, res) => {
	api.models.user.sayhi( (result) => {
		res.send(result);
	});
});

router.get('/create', (req, res) => {
	let user = {"first_name":"lahiru","last_name":"last_name"};

	api.models.user.create(user).exec( (error, model) => {
		res.send(model);
	});
});

module.exports = router;
