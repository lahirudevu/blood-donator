import express from 'express';

var router = express.Router();

router.post('/', (req, res) => {
    let eventObject = req.body;

    models.event.create(eventObject)
    .then((result) => {
        logger.info('created a new request ');
		logger.debug(result);

		res.status(201).send(result);
    })
    .catch((error) => {
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
	models.event.update({"id":id}, updateObj)
	.then((result)=>{

		logger.info('updated the request ');
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
	models.event.update(filter, updateObj)
	.then((result)=>{

		logger.info('updated request objs ');
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

	models.event.destroy({"id":id})
	.then((result)=>{

		logger.info('deleted the request ');
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

	models.event.findOne({"id":id})
	.then((result)=>{

		logger.info('finding a request ');
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

	models.event.findOne({"id":id})
	.then((result)=>{

		if(result && result.id){
			logger.info('request obj exists');
			res.status(200).send(true);
		}else{
			logger.info('request obj doesnt exist');
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

	logger.debug('finding all requests filter : ');
	logger.debug(filter);

	models.event.find(filter)
	.then((result)=>{

		logger.info('finding all the request objs matching criteria');
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
	models.event.find(filter)
	.then((result)=>{

		if(result.length>0){
			logger.info('updating obj in update or create');
			res.status(200);
			return models.event.update(filter, updateObj);
		}else{
			logger.info('create obj in update or create');
			res.status(201);
			return models.event.create(updateObj);
		}

	}).then((result)=>{
		res.send(result);
	})
	.catch((error)=>{
		logger.error(error);
		res.status(400).send(error);
	});
});


export default router;
