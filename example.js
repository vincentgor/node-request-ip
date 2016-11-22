'use strict';

var express = require('express');

var reqIP = require('./index');

var app = express();

var options = {
	real: 'r',
	forward: 'f'
};

app.use(reqIP(options));

app.get('/ip', function (req, res, next) {
	console.log(req[options.real]);
	console.log(req[options.forward]);
	res.end('666');
});

app.listen(8080);