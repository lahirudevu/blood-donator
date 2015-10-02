import express from 'express';
import fs from 'fs';
import multer  from 'multer';
import policies from '../policies/';
import UtilMethods from '../helpers/UtilMethods';

var router = express.Router();

let storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, appRoot + '/public/images/' + UtilMethods.calculateCurrentDate());
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname + '-' + Date.now());
	}
});

let upload = multer({ storage: storage });

// accept one file where the name of the form field is named photho
router.post('/upload', policies.uploadDirectory, upload.single('image'), (req, res) => {
	logger.debug('uploading file...');
    logger.info(req.file) // form files
    res.status(200).send('success');
});

export default router;