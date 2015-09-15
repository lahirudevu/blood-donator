
var sessionAuth = require('../policies/sessionAuth');
var isCreator = require('../policies/isCreator');
var hasEmail = require('../policies/hasEmail');

/**
**
**extract all the policies to the index file
**/
module.exports = {

	sessionAuth : sessionAuth,
	isCreator : isCreator,
	hasEmail : hasEmail
}