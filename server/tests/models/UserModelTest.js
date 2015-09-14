var Waterline = require('waterline');
var serverConfigs = require('../../config');
var mysqlAdapter = require('sails-mysql');
var expect = require('expect');

suite('UserModel', function () {
    var orm = new Waterline();
    // var config = {
    //     adapters: {
    //         'sails-memory': sailsMemoryAdapter
    //     },
    //     connections: {
    //         default: {
    //             adapter: 'sails-memory'
    //         }
    //     }
    // }

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

    setup(function (done) {
        var fs = require('fs');
        var path      = require('path');
        console.log('=============== api =============');
        console.log(path.join(__dirname, '../../api/models'));
        fs.readdirSync(path.join(__dirname, '../../api/models'))
          .filter(function(file) {
            return (file.indexOf('.') !== 0) && (file !== 'index.js');
          })
          .forEach(function(file) {
            var model = require(path.join(__dirname, '../../api/models', file));
            console.log('loading model '+ file);
            orm.loadCollection(model);
          });

        //initialize waterline models
        orm.initialize(config, function(err, models) {
            if(err) {
                throw err;
            }
            global.models = models.collections;
            global.connections = models.connections;
            done();
        });
    });

    // teardown(function (done) {
    //     done();
        // var adapters = config.adapters || {};
        // var promises = [];
        //
        // Object.keys(adapters)
        //     .forEach(function (adapter) {
        //         if (adapters[adapter].teardown) {
        //             var promise = new Promise(function (resolve) {
        //                 adapters[adapter].teardown(null, resolve);
        //             });
        //             promises.push(promise);
        //         }
        //     });
        //
        // return Promise.all(promises);
    // });

    test('should be able to create a user', function (done) {
        // var User = orm.collections.user;

            models.user.sayhi()
            .then(function (result) {
                console.log('sucess');
                expect(result).toEqual('hi guys');
                done();
            })
            .catch(function(error) {
                console.log('error occured');
                console.log(error);
                done();
            });
    });
});
