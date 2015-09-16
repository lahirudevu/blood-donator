'user strict';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
global.passport = require('./api/services/Passport').passport;

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
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));


var DB = require('./config/DBConfig');
DB.setup();

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(require('./api/controllers'));

app.listen(port, () => {
  	logger.info('Listening on the port ' + port);
});