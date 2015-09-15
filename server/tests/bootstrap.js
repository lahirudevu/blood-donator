import Waterline from 'waterline';
import serverConfigs from'../config';
import mysqlAdapter from 'sails-mysql';
import expect from 'expect';

before((done) => {
    global.orm = new Waterline();

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
                database: 'test_bloodDonatorDB',
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

    let fs = require('fs');
    let path      = require('path');

    fs.readdirSync(path.join(__dirname, '../api/models'))
      .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
      })
      .forEach((file) => {
        var model = require(path.join(__dirname, '../api/models', file));
        // console.log('loading model '+ file);
        orm.loadCollection(model);
      });

    //initialize waterline models
    orm.initialize(config, (err, models) => {
        if(err) {
            throw err;
        }
        global.models = models.collections;
        global.connections = models.connections;
        done();
    });
});

after((done) => {
    done();
    console.log('testing finished');
});
