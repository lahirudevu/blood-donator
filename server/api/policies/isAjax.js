module.exports = function (req, res, next) {

  let requestType = req.get('Content-Type'); 

  if (requestType && requestType == 'application/json') {
  	logger.info('application/json request');
  	next();
  }else{
  	logger.info('not xhr method');
  	res.render('index');
  }
}