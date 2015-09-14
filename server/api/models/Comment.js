import Waterline from 'waterline';

module.exports = Waterline.Collection.extend({

	identity: 'comment',
    connection: 'default',

    attributes: {
        request: {
        	model:'request'
        }
    }

});