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
      fs.createReadStream(path.resolve(__dirname, 'index.html'))
        .on('data', function(chunk){
          res.write(templateEngine(chunk.toString(), {message: 'Hello World! My message is HERE!'}))
        })
        .on('end', function(){
          res.end();
        })
        .on('error', function(error){
          re.statusCode = 404;
          res.end(error);
        });
    })
    .listen(8080); 