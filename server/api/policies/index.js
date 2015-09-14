
var sessionAuth = require('../policies/sessionAuth');
var isCreator = require('../policies/isCreator');

/**
**
**extract all the policies to the index file
**/
module.exports = {

	sessionAuth : sessionAuth,
	isCreator : isCreator
}