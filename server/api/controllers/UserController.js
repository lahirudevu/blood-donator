'use strict';

import express from 'express';

var router = express.Router();

router.get('/name/:id', (req, res) => {
	models.user.sayhi( (result) => {
		res.send(result);
	});
});

router.get('/create', (req, res) => {
	let user = {'firstName': 'lahiru', 'lastName': 'madhumal'};

	models.user.create(user).exec( (error, model) => {
		res.send(model);
	});
});

module.exports = router;
