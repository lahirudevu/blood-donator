var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;
var router = require('./config/routes');

app.use('/', router);
app.listen(port);

console.log('Magic happens on port ' + port);
