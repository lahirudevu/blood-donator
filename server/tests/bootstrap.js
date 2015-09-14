import Waterline from 'waterline';
import serverConfigs from'../config';
import mysqlAdapter from 'sails-mysql';
import expect from 'expect';

describe('Test Started ---', () => {
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

        var fs = require('fs');
        var path      = require('path');

        fs.readdirSync(path.join(__dirname, '../api/models'))
          .filter((file) => {
            return (file.indexOf('.') !== 0) && (file !== 'index.js');
          })
          .forEach((file) => {
            var model = require(path.join(__dirname, '../api/models', file));
            console.log('loading model '+ file);
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

    it('sayhi function works', (done) => {
        models.user.sayhi()
        .then((result) => {
            expect(result).toEqual('hi guys');
            done();
        })
        .catch( (error) => {
            console.log(error);
        })
    });

    it('sayhello function works', (done) => {
        models.user.sayhello('react', 'express')
        .then((result) => {
            expect(result).toEqual('react express');
            done();
        })
        .catch( (error) => {
            console.log(error);
        })
    })

    after((done) => {
        done();
        console.log('testing finished');
    });
});
