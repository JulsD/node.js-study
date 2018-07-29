export default function(req, res, next) {
    req.body.lastModifiedDate = Date.now();
    next()
}