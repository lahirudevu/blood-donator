import Waterline from 'waterline';

module.exports = Waterline.Collection.extend({

	identity: 'donation',
    connection: 'default',

});