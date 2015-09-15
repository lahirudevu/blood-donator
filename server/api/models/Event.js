import Waterline from 'waterline';
import Alias from '../helpers/Alias';

module.exports = Waterline.Collection.extend({

	identity: 'event',
	connection: 'default',

	attributes: {

		alias: {
			type: 'string'
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

	beforeCreate: (values, cb) => {
		logger.debug('inside Event: before create');
		logger.debug(values);

		let getSlug = require('speakingurl');
		let alias = getSlug(values.title);
		let aliasFilter = {or: [{alias: alias}, { alias: {'startsWith': alias + '-'}}]};

		models.event.find(aliasFilter)
		.then((matchAliases) => {
			if (matchAliases.constructor === Array && matchAliases.length === 0) {
                logger.info(alias + ' alias created for ' + values.title);
                values.alias = alias;
				cb();
            } else {
				// let Alias = new Alias();
				Alias.calculateAlias(alias, matchAliases)
				.then((alias) => {
					values.alias = alias;
					cb();
				});
			}
		})
		.catch((error) => {
			logger.error('error occured in creating alias for event ' + values.title);
			logger.error(error);
		});
	}
});
