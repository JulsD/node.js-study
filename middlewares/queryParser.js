const querystring = require('querystring');

let queryParser = function(req, res, next) {
    if(req.url.indexOf('?') >=0) {
        req.parsedQuery = querystring.parse(req.url.slice(req.url.indexOf('?') + 1));
        console.log('parsedQuery', req.parsedQuery);
    }
    next()
}

export default queryParser;