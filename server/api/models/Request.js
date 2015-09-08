import Waterline from 'waterline';

module.exports = Waterline.Collection.extend({

    identity: 'request',
    connection: 'default',

    attributes: {
        title: 'string',
        description: 'string'
    }
});
