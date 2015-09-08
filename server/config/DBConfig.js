// var postgresAdapter = require('sails-mongo');
var Waterline = require('waterline');
var mysqlAdapter = require('sails-mysql');

export default {

	setup : function() {
			var orm = new Waterline();

			var config = {
			    adapters: {
			        'default': mysqlAdapter,
			        mongo: require('sails-mongo'),
			        mysql: mysqlAdapter
			    },
			    connections: {
			        'default': {
			            adapter: 'mysql',
				        host: 'localhost',
				        database: 'bloodDonatorDB',
				        port      : 3306,
					    user      : 'root',
					    password  : 'pass'
			        }
			    },

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
