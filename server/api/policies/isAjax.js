module.exports = function (req, res, next) {

  let requestType = req.get('Content-Type'); 

  if(!requestType){
  	logger.debug('reqtype not set');
  	res.render('index');
  }else{

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

	  	logger.info('application/json or multipart request or form data');
	  	next();
	  }else{

	  	logger.info('not xhr method');
	  	res.render('index');
	  }
  }
}