module.exports = function(req, res, next) {
  
  logger.info('loading auth policy');

  var x = 2;
  if (x==2) {
    return next();
  }else{
  	return res.send('You are not permitted to perform this action.');
  }
};