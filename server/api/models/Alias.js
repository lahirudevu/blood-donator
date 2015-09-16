import Waterline from 'waterline';

module.exports = Waterline.Collection.extend({

    identity: 'alias',
    connection: 'default',

    uniqueKey: false,

    /**
     * Custom validation types
     */
    types: {
        uniqueKey: function(value) {
            return uniqueKey;
        },
    },

    attributes: {
        key: {
            type: 'string',
            unique: true,
            uniqueKey: true
        },

        alias: {
            type: 'string',
            unique: true
        }
    },

    /**
     * Lifecycle Callbacks
     */
    beforeValidate: (values, cb) => {
        /* check whether the key is unique for alias collection */
        Alias.findOne({key: values.key})
        .then((err, record) => {
            uniqueKey = !err && !record;
            cb();
        }).catch((error) => {
            cb();
        });
    },

    /**
     * @description :: create a new alias for itemId.
     * @param       :: itemId - String: id of the object
     * @param       :: itemName - String
     * @author      :: Gayan Witharana <gayan@thinkcube.com>
     */
    createAlias: (itemId, itemName, type) => {
        let getSlug = require('speakingurl');
        let async = require('async');

        let alias = getSlug(itemName); //create a seo friendly url word from itemName
        let createdAlias = '';
        let aliasFilter = '';

        if (type === 'update') { //filter object for update an alias
            aliasFilter = {
                or: [{alias: alias}, { alias: {'startsWith': alias + '-'}}],
                key: {'!': itemId}
            };
        } else { //filter for add an alias
            aliasFilter = {or: [{alias: alias}, { alias: {'startsWith': alias + '-'}}]};
        }

        Alias.find(aliasFilter)
        .then((matchAliases) => {
            if (matchAliases.constructor === Array && matchAliases.length === 0) {
                logger.info(alias + ' alias created for ' + itemId);
                return Promise.resolve(alias);
            } else {
                let maxNumber = 0;

                async.each(matchAliases, (singleAliasObject, callback) => {
                    var aliasWordArray = singleAliasObject.alias.split('-');
                    var aliasCounter = aliasWordArray[aliasWordArray.length - 1];
                    if (!isNaN(parseInt(aliasCounter))) {
                        var aliasNumber = parseInt(aliasCounter);
                        if (aliasNumber > maxNumber) {
                            maxNumber = aliasNumber;
                        }
                    }
                    callback();
                }, (error) => {
                    createdAlias = alias + '-' + (maxNumber + 1);
                    logger.info(createdAlias + ' alias created for ' + itemId);
                    return Promise.resolve(createdAlias);
                });
            }
        })
        .catch((error) => {
            logger.error(error.toString());
            return Promise.reject('error occured in finding alias');
        });
    },

    /**
     * @description :: add a new alias to the alias collection.
     * @param       :: itemId - String: id of the object
     * @param       :: itemName - String
     * @author      :: Gayan Witharana <gayan@thinkcube.com>
     */
    addAlias: (itemId, itemName) => {
        Alias.createAlias(itemId, itemName, 'add')
        .then((createdAlias) => {
            return Alias.create({key: itemId, alias: createdAlias});
        })
        .then((aliasObject) => {
            return Promise.resolve(aliasObject);
        })
        .catch((error) => {
            logger.error('error in adding alias to the database');
            return Promise.reject('error in adding alias to the database');
        });
    },

    /**
     * @description :: update the current alias itemName.
     * @param       :: itemId - String: id of the object
     * @param       :: itemName - String
     * @author      :: Gayan Witharana <gayan@thinkcube.com>
     */
    updateAlias: (itemId, itemName) => {
        Alias.createAlias(itemId, itemName, 'update')
        .then((createdAlias) => {
            return Alias.update({key: itemId}, {alias: createdAlias});
        })
        .then((updatedAliasObject) => {
            if (updatedAliasObject.constructor === Array && updatedAliasObject.length === 0) {
                logger.error('alias object can not be found');
                return Promise.reject('alias object can not be found');
            } else {
                logger.info('<' + createdAlias + '> alias updated for id = ' + itemId);
                return Promise.resolve(updatedAliasObject[0]);;
            }
        })
        .catch((error) => {
            logger.error('error occured in updating alias');
            return Promise.reject('error occured in updating alias');
        });
    }
});
