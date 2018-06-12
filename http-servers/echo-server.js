const http = require('http');

http.createServer()
    .on('request', function(req, res) {
        req.pipe(res);
    })
    .listen(8080);