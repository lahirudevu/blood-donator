var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = (process.env.PORT || 3001);

var path = require('path');
global.appRoot = path.resolve(__dirname);

//set view engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./api/controllers'));
var DB = require('./config/DBConfig');

DB.setup();

app.listen(port, function() {
  	console.log('Listening on port ' + port)
});