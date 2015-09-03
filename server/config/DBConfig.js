var postgresAdapter = require('sails-mongo');
var Waterline = require('waterline');
var api = require('../api/Api');

module.exports={

	setup : function(){


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

			fs.readdirSync(appRoot+"/api/models")
			  .filter(function(file) {
			    return (file.indexOf(".") !== 0) && (file !== "index.js");
			  })
			  .forEach(function(file) {
			    var model = require(path.join(appRoot+"/api/models/", file));
			    logger.info('loading model '+file)
			    orm.loadCollection(model);
			  });

			//initialize waterline models
			orm.initialize(config, function(err, models) {
			  if(err) throw err;
			  api.models = models.collections;
			  api.connections = models.connections;
			 
			});
	}
};