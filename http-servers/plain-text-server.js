var http = require('http');

http.createServer()
    .on('request',function (req, res) {
        let { method } = req;
        if(method === 'GET') {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('Hello World!'); 
            res.end();
        }
    }).listen(8080); 