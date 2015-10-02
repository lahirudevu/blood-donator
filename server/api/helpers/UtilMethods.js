import crypto from 'crypto';

export default {

	validateEmail : function(email) {
	    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return re.test(email);
	},

	validateDate : function(date) {
		//validate date
	    return true;
	},

	validateTime : function(date) {
		//validate time
	    return true;
	},

	generateRandomString: function(length){
		return crypto.randomBytes(Math.ceil(length * 3 / 4))
        .toString('base64')   // convert to base64 format
        .slice(0, length)        // return required number of characters
        .replace(/\+/g, '0')  // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
	},

	//get current date to the format of 'yyyy-mm-dd'
	calculateCurrentDate: function() {
		let date = new Date();
		// let datevalues = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	}

};
