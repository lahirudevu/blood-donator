export default class UtilMethods {
	
	static validateEmail(email) {
        if( /(.+)@(.+){2,}\.(.+){2,}/.test(email) ){
		  return true;
		} else {
		  return false;
		}
    }
}