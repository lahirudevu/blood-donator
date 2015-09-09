// var postgresAdapter = require('sails-mongo');
var Waterline = require('waterline');
var mysqlAdapter = require('sails-mysql');
var serverConfigs = require('../config');
var models;
before(function(){

	/**
	**This method initializes the database and loades water line models
	**/
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
		        database: 'test-bloodDonatorDB',
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
    var appRoot = path.resolve(__dirname);
    var relPath = path.normalize(appRoot + '/../api/models');

	fs.readdirSync(relPath)
	  .filter(function(file) {
	    return (file.indexOf('.') !== 0) && (file !== 'index.js');
	  })
	  .forEach(function(file) {
	    var model = require(path.join(relPath, file));
	    console.log('loading model '+ file);
	    orm.loadCollection(model);
	  });

	//initialize waterline models
	orm.initialize(config, function(err, models) {
        console.log('inside orm initi');
		if(err) {
			throw err;
		}
		models = models.collections;
		connections = models.connections;
        console.log('<< leaving bootstrap >>>');
        console.log(models.user.sayhi);
	});
});

after(function() {
    console.log('======================== test start ======');
    describe('User Model', () => {
        it('should return hi', (done) => {
            console.log('======================== test start ======');
            // var User = new User();
            // console.log(User.super_.extend.toString());
            // expect('hi').toEqual('hi');
            // done();
            models.user.sayhi( (result) => {
                expect(result).toEqual('hi');
                done();
            });
        });
    });
})
