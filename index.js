'use strict';

module.exports = mw;
module.exports.getXRealIP = getXRealIP;
module.exports.getXForwardedFor = getXForwardedFor;

function getXRealIP(req) {
	var ip = req.headers['x-real-ip'];
	return ip || 'x-real-ip';
}

function getXForwardedFor(req) {
	var ip = req.headers['x-forwarded-for'];
	return ip || 'x-forwarded-for';
}

function mw(options) {

	options = options || {};
	var key = options.key || 'clientIP';

	return function (req, res, next) {
		req[key] = getXRealIP(req);
		next();
	}

}
