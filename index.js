'use strict';

module.exports = mw;
module.exports.getXRealIP = getXRealIP;
module.exports.getXForwardedFor = getXForwardedFor;

/**
 * ### get the real client ip address
 */
function getXRealIP(req) {
	var ip = req.headers['x-real-ip'];

	if (!ip) {
		ip = req.connection.remoteAddress;
	}

	return ip;
}

/**
 * ### get the proxy ip address list
 */
function getXForwardedFor(req) {
	var ipArr = req.headers['x-forwarded-for'] || '';

	ipArr.split(/ *, */).filter(Boolean);

	var ip = req.connection.remoteAddress;

	ipArr = ipArr.concat([ip]);

	return ipArr;
}

/**
 * ### get the both address above, and return a middleware for express
 */
function mw(options) {

	options = options || {};
	var real = options.real || 'clientIP';
	var forward = options.forward || 'forwardedIPList';

	return function (req, res, next) {
		req[real] = getXRealIP(req);
		req[forward] = getXForwardedFor(req);
		next();
	}

}
