'user strict';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

var app = express();
var port = (process.env.PORT || 3001);
global.appRoot = path.resolve(__dirname);

//set view engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var Log = require('./config/LogConfig');
Log.setup();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./api/controllers'));

var DB = require('./config/DBConfig');
DB.setup();


app.listen(port, () => {
  	logger.info('Listening on port ' + port);
});
