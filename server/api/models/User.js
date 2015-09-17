import Waterline from 'waterline';
import { calculateAlias } from '../helpers/Alias';

module.exports = Waterline.Collection.extend({

    identity: 'user',
    connection: 'default',

    attributes: {
        alias: {
            type: 'string'
        },

        firstName: {
            type: 'string'
        },

        lastName: {
            type: 'string'
        },

        email: {
            type: 'email'
        },

        password: {
            type: 'string'
        },

        requests: {
            collection: 'request',
            via: 'user'
        },

        events: {
            collection: 'event',
            via: 'creator'
        },

        comments: {

            collection: 'comment',
            via: 'user'
        },

        profileImageUrl: {
            type: 'string'
        }

    },

    beforeCreate: (values, cb) => {
        logger.debug('inside Event: before create');
        logger.debug(values);

        const getSlug = require('speakingurl');
        const name = (values.firstName && values.lastName) ?  
            values.firstName + ' ' + values.lastName :
            values.firstName;

        const alias = getSlug(name);
        const aliasFilter = {
            or: [{
                alias: alias
            }, {
                alias: {
                    'startsWith': alias + '-'
                }
            }]
        };

        models.user.find(aliasFilter)
            .then((matchAliases) => {
                if (matchAliases.constructor === Array && matchAliases.length === 0) {
                    logger.info(alias + ' alias created for ' + values.title);
                    values.alias = alias;
                    cb();
                } else {
                    calculateAlias(alias, matchAliases)
                        .then((calculatedAlias) => {
                            values.alias = calculatedAlias;
                            cb();
                        });
                }
            })
            .catch((error) => {
                logger.error('error occured in creating alias for event ' + values.title);
                logger.error(error);
            });
    },

    sayhi: () => {
        return Promise.resolve('hi guys');
    },

    sayhello: (hiIp, helloIP) => {
        let result = hiIp + " " + helloIP;
        return Promise.resolve(result);
    }
});