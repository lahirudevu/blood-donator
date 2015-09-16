'user strict';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
var passport = require('./api/services/Passport').passport;

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
app.use(require('./api/controllers'));


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

app.listen(port, () => {
  	logger.info('Listening on port ' + port);
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['openid email profile'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  function(req, res) {
    // Authenticated successfully
    res.send('authenticated');
  });

app.get('/authenticated', function(req, res) {
  if (req.isAuthenticated()) {
    logger.info('authenticated');
    res.send('authenticated');
  }else{
  	logger.info('not authenticated');
    res.send('not authenticated');
  }
});