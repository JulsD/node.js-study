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
    .on('request', function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});

      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'));

      res.write(templateEngine(template.toString(), {message: 'Hello World! My message is HERE!'}));
      res.end();
    })
    .listen(8080); 