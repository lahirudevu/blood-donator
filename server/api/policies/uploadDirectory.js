import mkdirp from 'mkdirp';
import UtilMethods from '../helpers/UtilMethods';

module.exports = function(req, res, next) {
	mkdirp(appRoot + '/public/images/' + UtilMethods.calculateCurrentDate(), (error) => {
		logger.info('ayyoooo');
		if (error) {
			logger.error(error);
		} else {
			logger.debug("folder found or created for uploading images");
			next();
		}		
	});
}