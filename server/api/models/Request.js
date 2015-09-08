import Waterline from 'waterline';

module.exports = Waterline.Collection.extend({

    identity: 'request',
    connection: 'default',

    attributes: {
        title: 'string',
        description: 'string'
    },

    sayhi : (cb) => {
    	logger.debug('saying hello');
    	return cb('hi boys');
    }
});
