var http = require('http');

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
      { color: 'blue' },
      { size: 'XL' }
  ]
};

http.createServer()
    .on('request', function (req, res) {
      let { method } = req;
        if(method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(product)); 
        res.end();
      }
    }).listen(8080); 