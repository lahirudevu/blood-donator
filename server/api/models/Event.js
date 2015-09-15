import Waterline from 'waterline';

module.exports = Waterline.Collection.extend({

	identity: 'event',
	connection: 'default',

	attributes: {

		alias: {
			type: 'string',
			required: true
		},

		title: {
			type: 'string',
			required: true
		},

		description: {
			type: 'string',
			required: true
		},

		creator: {
			model: 'user'
		},

		location: {
			type: 'string',
			required: true
		}
	},

	beforeCreate: function(values, cb) {
		logger.debug('inside Event: before create');
		logger.debug(values);		
		values.alias = 'new-event';
		cb();
	},
});
