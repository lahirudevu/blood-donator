import Waterline from 'waterline';

module.exports = Waterline.Collection.extend({

	identity: 'event',
    connection: 'default'

});
