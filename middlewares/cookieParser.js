 let cookieParser = function(req, res, next) {
    var list = {},
        reqCookie = req.headers.cookie;

    reqCookie && reqCookie.split(';').forEach(function( cookie ) {
        let parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    req.parsedCookies = list;
    console.log('req.parsedCookies', req.parsedCookies)
    next();
}

let cookieLog = function(req, res, next) {
    cookieParser(req, res, next);
    res.send(req.parsedCookies);
    next();
}

export { 
    cookieParser,
    cookieLog
};