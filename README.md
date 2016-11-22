# node-request-ip
real client ip

### what it can do
to use this, you can get the client real ip and then proxy ip list

### such as an example
```js
'use strict';

var express = require('express');

var reqIP = require('x-real-ip');

var app = express();

var options = {
	real: 'r',
	forward: 'f'
};

app.use(reqIP(options));

app.get('/ip', function (req, res, next) {
	console.log(req[options.real]);
	console.log(req[options.forward]);
});

app.listen(8080);
```

### api

##### getXRealIP(req)
it will return the client real ip address
```js
var ip = getXRealIP(req);
console.log(ip);   // ::ffff:192.168.3.3
```

##### getXForwardedFor(req)
it will return the proxy ip list
```js
var ip = getXForwardedFor(req);
console.log(ip);   // ::ffff:192.168.3.3, ::ffff:192.168.3.7
```

##### mw(options)
as a middleware, it can get the both above
```js
var reqIP = require('x-real-ip');
var options = { real: 'r', forward: 'f'};
app.get('/ip', reqIP (options), function(req, res, next) {
    req[options.real];  // 
    req[options.forward]; //
});
```

`options`: attached to `req[key]`
1. `real`: real ip ,default `clientIP`.
2. `forward`: proxy ip list, default `forwardedIPList`
3. wait...
