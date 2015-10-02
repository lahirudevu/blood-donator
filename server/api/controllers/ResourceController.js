import express from 'express';
import fs from 'fs';
import multer  from 'multer';

var router = express.Router();
var upload = multer({ dest: appRoot + '/public/images/'});

router.post('/upload', (req, res) => {
    console.log(req.files.image);
    var tmp_path = req.files.image.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = appRoot + '/public/images/' + req.files.image.name;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
    });
});

// accept one file where the name of the form field is named photho
// router.post('/upload', upload.single('image'), (req, res) => {
//     logger.debug('=============== start ================');
//     console.log(req.body) // form fields
//     console.log(req.file) // form files
//     logger.debug('=============== end ================');
//     res.status(200).send('success');
// });

export default router;