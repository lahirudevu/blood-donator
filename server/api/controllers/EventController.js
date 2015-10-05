import express from 'express';
import multer  from 'multer';
import policies from '../policies/';
import UtilMethods from '../helpers/UtilMethods';

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

//initialize storage variable for uploading files
let storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, appRoot + '/public/images/' + UtilMethods.calculateCurrentDate());
		},
		filename: function(req, file, cb) {
			const lastDotIndex = file.originalname.lastIndexOf('.');
			const fileName = file.originalname.substr(0, lastDotIndex);
			const fileExtenstion = file.originalname.substr(lastDotIndex + 1);
			cb(null, fileName + '-' + Date.now() + '.' + fileExtenstion);
		}
	});
let upload = multer({ storage: storage });

// upload image
router.post('/image-upload', policies.uploadDirectory, upload.single('image'), (req, res) => {
	logger.debug('uploading file to event ' + req.body.eventId);
    logger.info(req.file) // form files

    let imagePath = req.file.path;
    let eventId = req.body.eventId;
    logger.debug('event id => ' + eventId);

    models.resource.create({path: imagePath, eventId: eventId})
    .then((createdResult) => {
    	logger.info('resource created for event ' + eventId);
    	logger.debug(createdResult);
    	// logger.debug('resource added for event id ' + updateResult[0].id)
    	res.status(200).send('success');
    })
    .catch((error) => {
    	res.status(404).send('not found');	    	
    	logger.error(error);
    });    
});

//retrieve images for an event
router.get('/images/getimages', (req, res) => {
	var eventId = req.query.eventId;
	logger.debug('get images for event ' + eventId);

	models.event.getImages(eventId)
	.then((imagesArray) => {
		res.status(200).send(imagesArray);
	})
	.catch((error) => {
		logger.error(error);
		res.status(500).send('error occured');
	});
});


export default router;
