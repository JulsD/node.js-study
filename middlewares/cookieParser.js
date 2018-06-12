const cookieParser = require('cookie-parser');

export default function(options) {
    return function(req, res, next) {
        req.parsedCookies = cookieParser(options);
        next()
    }
  }