'use strict';

var express = require('express');

var reqIP = require('./index');

var app = express();

var options = {
	key: 'clientIP'
};

app.use(reqIP(options));

app.get('/ip', function (req, res, next) {
	res.end(req[options.key]);
});

app.listen(8080);