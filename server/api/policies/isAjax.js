//check if the url is neither ajax nor react router call
function isByPassUrl(url){

	if(url.indexOf('/auth')==0 || url.indexOf('/favicon.ico')==0){
		return Promise.resolve(true);
	}else{
		return Promise.resolve(false);
	}
}

module.exports = function (req, res, next) {

	let orgUrl = req.originalUrl;
	logger.debug('request url : ' +orgUrl);

	isByPassUrl(orgUrl)
	.then(bypass=>{

  		//check if needs to be loaded normally
  		if(bypass){
  			next();
  		}else{

  			let requestType = req.get('Content-Type'); 

  			//no content type is set then load react way
  			if(!requestType){
  				logger.debug('reqtype not set');
  				res.render('index');
  			}else{

  				//else if an api call, then call the api
  				requestType = requestType.toLowerCase(); 

  				let isjsonreq = false;
  				let ismultipart = false;
  				let isformurl = false;

  				if(requestType == 'application/json')
  					isjsonreq = true;

  				if(requestType.indexOf('multipart')>-1)
  					ismultipart = true;

  				if(requestType.indexOf('form-urlencoded')>-1)
  					isformurl = true;

		  //if multipart or json request
		  if (isjsonreq || ismultipart || isformurl) {

		  	logger.debug('application/json or multipart request or form data');
		  	next();
		  }else{

		  	logger.debug('not xhr method');
		  	res.render('index');
		  }
		}

	}

});
}