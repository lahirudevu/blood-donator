'use strict';

import express from 'express';
import Email from '../services/Email';

var router = express.Router();

//create a new user object
router.post('/', (req, res) => {

	let user = req.body;

	models.user.create(user)
	.then((result)=>{

		logger.info('created a new user ');
		logger.debug(result);

		res.status(201).send(result);
	})
	.catch((error)=>{
		logger.error(error);
		res.status(400).send(error);
	});

});

//update attributes for a model.
router.put('/:id', (req, res) => {

	let id = req.params.id;
	let updateObj = req.body;
	logger.info('updating model ' + id);

	//update the object
	models.user.update({"id":id}, updateObj)
	.then((result)=>{

		logger.info('updated the user ');
		logger.debug(result);

		res.status(200).send(result);
	})
	.catch((error)=>{
		logger.error(error);
		res.status(400).send(error);
	});

});

//update instances of the model matching the criteria
router.post('/update', (req, res) => {

	let filter = req.body.filter;
	let updateObj = req.body.update;
	logger.info('updating matcing models ');

	//update the matching objects
	models.user.update(filter, updateObj)
	.then((result)=>{

		logger.info('updated user objs ');
		logger.debug(result);

		res.status(200).send(result);
	})
	.catch((error)=>{
		logger.error(error);
		res.status(400).send(error);
	});
});

//delete an instance by id
router.delete('/:id', (req, res) => {

	let id = req.params.id;

	models.user.destroy({"id":id})
	.then((result)=>{

		logger.info('deleted the user ');
		logger.debug(result);

		res.status(200).send(result);
	})
	.catch((error)=>{
		logger.error(error);
		res.status(400).send(error);
	});
});

//get an instance by id
router.get('/:id', (req, res) => {

	let id = req.params.id;

	models.user.findOne({"id":id})
	.then((result)=>{

		logger.info('finding a user ');
		logger.debug(result);

		res.status(201).send(result);
	})
	.catch((error)=>{
		logger.error(error);
		res.status(400).send(error);
	});
});

//check weather an instance exists
router.get('/:id/exists', (req, res) => {

	let id = req.params.id;

	models.user.findOne({"id":id})
	.then((result)=>{

		if(result && result.id){
			logger.info('user obj exists');
			res.status(200).send(true);
		}else{
			logger.info('user obj doesnt exist');
			res.status(200).send(false);
		}

	})
	.catch((error)=>{
		logger.error(error);
		res.status(400).send(error);
	});
});

//find all instances matched by the filter
router.get('/', (req, res) => {

	let filter = req.query;

	logger.debug('finding all users filter : ');
	logger.debug(filter);

	models.user.find(filter)
	.then((result)=>{

		logger.info('finding all the user objs matching criteria');
		res.status(200).send(result);

	})
	.catch((error)=>{
		logger.error(error);
		res.status(400).send(error);
	});
});

//update an existing model or create new instance if not
router.put('/', (req, res) => {

	let filter = req.body.filter;
	let updateObj = req.body.update;

	//update the matching objects
	models.user.find(filter)
	.then((result)=>{

		if(result.length>0){
			logger.info('updating obj in update or create');
			res.status(200);
			return models.user.update(filter, updateObj);
		}else{
			logger.info('create obj in update or create');
			res.status(201);
			return models.user.create(updateObj);
		}
		
	}).then((result)=>{
		res.send(result);
	})
	.catch((error)=>{
		logger.error(error);
		res.status(400).send(error);
	});
});




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

router.get('/send-email', (req, res) => {
	Email.send('vgayancharith@gmail.com', 'subject', 'this is text')
	.then((result) => {
		logger.debug('Email send successfully');
		res.send(result);
	})
	.catch((error) => {
		logger.error('error occured when sending the email ' + error);
		res.send(error);
	});
});

module.exports = router;
