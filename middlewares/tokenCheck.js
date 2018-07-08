import jwt from 'jsonwebtoken';

let tokenCheck = function(req, res, next) {
    let token = req.headers['x-acces-token'];

    if(token) {
        jwt.verify(token, 'someSecret', function(err, decoded) {
            if(err) {
                res.status(401).json({ success: false, message: "Failed to authanticate token"});
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({success: false, message: 'No token provided'});
    }
}

export default tokenCheck;