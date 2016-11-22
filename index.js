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
	var real = options.real || 'clientIP';
	var forward = options.forward || 'forwardedIPList';

	return function (req, res, next) {
		req[real] = getXRealIP(req);
		req[forward] = getXForwardedFor(req);
		next();
	}

}
