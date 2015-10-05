import Waterline from 'waterline';

module.exports = Waterline.Collection.extend({

	identity: 'resource',
	connection: 'default',

	attributes: {
		path: {
			type: 'string',
			required: true
		},

		eventId: {
			model: 'event'
		}
	}
});