
var sessionAuth = require('../policies/sessionAuth');
var isCreator = require('../policies/isCreator');
var hasEmail = require('../policies/hasEmail');
var isAjax = require('../policies/isAjax');
var uploadDirectory = require('../policies/uploadDirectory');

/**
**
**extract all the policies to the index file
**/
module.exports = {

	sessionAuth : sessionAuth,
	isCreator : isCreator,
	hasEmail : hasEmail,
	isAjax : isAjax,
	uploadDirectory: uploadDirectory
}