var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = (process.env.PORT || 3001);

//set view engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./api/controllers'));

var postgresAdapter = require('sails-mongo');
var Waterline = require('waterline');

var orm = new Waterline();

var config = {
    adapters: {
        'default': 'mongo',
        mongo: require('sails-mongo')
    },
    connections: {
        'default': {
            adapter: 'mongo',
            url: 'mongodb://localhost:27017/testone'
        }
    }
};

var fs = require('fs');
var path      = require("path");

fs.readdirSync(__dirname+"/api/models")
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = require(path.join(__dirname+"/api/models/", file));
    console.log('loading model')
    orm.loadCollection(model);
  });

//initialize waterline models
orm.initialize(config, function(err, models) {
  if(err) throw err;
  global.models = models.collections;
  global.connections = models.connections;
 
});

app.listen(port, function() {
  	console.log('Listening on port ' + port)
});