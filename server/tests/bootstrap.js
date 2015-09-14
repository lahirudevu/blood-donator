// var Waterline = require('waterline');
// var serverConfigs = require('../config');
// var mysqlAdapter = require('sails-mysql');
// var expect = require('expect');
//
// suite('UserModel', function () {
//     global.orm = new Waterline();
//
//     var config = {
//
//         //available adapters
//         adapters: {
//             'default': mysqlAdapter,
//             mongo: require('sails-mongo'),
//             mysql: mysqlAdapter
//         },
//
//         //usable connections
//         connections: {
//             'default': {
//                 adapter: 'mysql',
//                 host: 'localhost',
//                 database: 'test_bloodDonatorDB',
//                 port      : 3306,
//                 user      : serverConfigs.DBUser,
//                 password  : serverConfigs.DBPassword
//             }
//         },
//
//         //create or update table structure
//         defaults: {
//             migrate: 'alter'
//         }
//     };
//
//     setup(function (done) {
//         var fs = require('fs');
//         var path      = require('path');
//         console.log('=============== api =============');
//         console.log(path.join(__dirname, '../../api/models'));
//         fs.readdirSync(path.join(__dirname, '../../api/models'))
//           .filter(function(file) {
//             return (file.indexOf('.') !== 0) && (file !== 'index.js');
//           })
//           .forEach(function(file) {
//             var model = require(path.join(__dirname, '../../api/models', file));
//             console.log('loading model '+ file);
//             orm.loadCollection(model);
//           });
//
//         //initialize waterline models
//         orm.initialize(config, function(err, models) {
//             if(err) {
//                 throw err;
//             }
//             global.models = models.collections;
//             global.connections = models.connections;
//             done();
//         });
//     });
// });
