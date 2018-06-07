const cookieParser = require('cookie-parser');
module.exports = function(options) {
    return function(req, res, next) {
        req.parsedCookies = cookieParser(options);
        next()
    }
  }