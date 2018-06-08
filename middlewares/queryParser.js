const querystring = require('querystring');
module.exports = function(query) {
    return function(req, res, next) {
        req.parsedQuery = querystring.parse(query);
        next()
    }
  }