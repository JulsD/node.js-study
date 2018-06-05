const http = require('http');
const path = require('path');
const fs = require('fs');

function templateEngine(template, data) {
    let vars = template.match(/\{\w+\}/g);

    if (!vars) {
      return template;
    }

    let nonVars = template.split(/\{\w+\}/g);
    let output = '';

    for (let i = 0; i < nonVars.length; i++) {
      output += nonVars[i];

      if (i < vars.length) {
        let key = vars[i].replace(/[\{\}]/g, '');
        output += data[key]
      }
    }

    return output;
  };

http.createServer()
    .on('request', (req, res) => {
      let {method} = req;
      if(method === 'GET') {
        fs.createReadStream(path.resolve(__dirname, 'index.html'))
          .on('data', (chunk) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(templateEngine(chunk.toString(), {message: 'Hello World! My message is HERE!'}))
          })
          .on('end', () => {
            res.end();
          })
          .on('error', (error) => {
            re.statusCode = 404;
            res.end(error);
          });
      }
    }).listen(8080); 