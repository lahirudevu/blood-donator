// var postgresAdapter = require('sails-mongo');
var Waterline = require('waterline');
var mysqlAdapter = require('sails-mysql');
var serverConfigs = require('../config');

export default {

	/**
	**This method initializes the database and loades water line models
	**
	**/
	setup : function() {
			var orm = new Waterline();

			var config = {

				//available adapters
			    adapters: {
			        'default': mysqlAdapter,
			        mongo: require('sails-mongo'),
			        mysql: mysqlAdapter
			    },

			    //usable connections
			    connections: {
			        'default': {
			            adapter: 'mysql',
				        host: 'localhost',
				        database: 'bloodDonatorDB',
				        port      : 3306,
					    user      : serverConfigs.DBUser,
					    password  : serverConfigs.DBPassword
			        }
			    },

			    //create or update table structure
			    defaults: {
			    	migrate: 'alter'
			    }
			};

			var fs = require('fs');
			var path      = require('path');

			fs.readdirSync(appRoot + '/api/models')
			  .filter(function(file) {
			    return (file.indexOf('.') !== 0) && (file !== 'index.js');
			  })
			  .forEach(function(file) {
			    var model = require(path.join(appRoot + '/api/models/', file));
			    logger.info('loading model '+ file);
			    orm.loadCollection(model);
			  });

			//initialize waterline models
			orm.initialize(config, function(err, models) {
				if(err) {
					throw err;
				}
				global.models = models.collections;
				global.connections = models.connections;
			});
	}
};
