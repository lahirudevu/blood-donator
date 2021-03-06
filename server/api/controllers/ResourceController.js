import express from 'express';
import fs from 'fs';
import multer  from 'multer';
import policies from '../policies/';
import UtilMethods from '../helpers/UtilMethods';

const router = express.Router();
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

// upload file
router.post('/upload', policies.uploadDirectory, upload.single('image'), (req, res) => {
	logger.debug('uploading file...');
    logger.info(req.file) // form files
    if (req.file) {
    	res.status(200).send('success');
    } else {
    	res.status(200).send('not found');
    }    
});

export default router;