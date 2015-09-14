'use strict';

import express from 'express';

var router = express.Router();

router.get('/cbHellStopper', (req, res) => {

	models.user.sayhi()
	.then((result)=>{
		return models.user.sayhello(result, "hello ip");
	})
	.then((result)=>{
		res.send(result);
	})
	.catch((error)=>{
	  logger.error('oh no', error);
	  res.send(error);
	});
});

router.get('/create', (req, res) => {

	let user = {'firstName': 'lahiru', 'lastName': 'madhumal'};

	models.user.create(user)
	.then((result)=>{
		logger.debug('created user ');
		logger.debug(user);
		res.send(result);
	})
	.catch((error)=>{
		logger.error(error);
		res.send(error);
	});
});

module.exports = router;
