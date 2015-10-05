import Waterline from 'waterline';
import { calculateAlias } from '../helpers/Alias';
import async from 'async';

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
		},

		resourceId: {
			collection: 'resource',
			via: 'eventId'
		}
	},

	beforeCreate: (values, cb) => {
		logger.debug('inside Event: before create');
		logger.debug(values);

		const getSlug = require('speakingurl');
		const alias = getSlug(values.title);
		const aliasFilter = {
			or: [{
				alias: alias
			}, {
				alias: {
					'startsWith': alias + '-'
				}
			}]
		};

		models.event.find(aliasFilter)
			.then((matchAliases) => {
				if (matchAliases.constructor === Array && matchAliases.length === 0) {
					logger.info(alias + ' alias created for ' + values.title);
					values.alias = alias;
					cb();
				} else {
					calculateAlias(alias, matchAliases)
						.then((calculateAlias) => {
							values.alias = calculateAlias;
							cb();
						});
				}
			})
			.catch((error) => {
				logger.error('error occured in creating alias for event ' + values.title);
				logger.error(error);
			});
	},

	getImages: (eventId) => {
		return new Promise((resolve, reject) => {
			if (eventId) {
				models.resource.find({eventId: eventId})
					.then((resourceData) => {
						logger.info('resources data for event' + eventId);
						logger.debug(resourceData);

						let imagesArray = []; //initialize images array for event

						async.eachSeries(resourceData, function iterator(item, callback) {
							imagesArray.push(item.path);
							callback();
						}, function done() {
							resolve(imagesArray);
						});
					})
					.catch((error) => {
						logger.error(error);
						reject('error occured');
					});
			} else {
				reject('event id not defined');
			}
		});
	}
});