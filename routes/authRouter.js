import express from 'express';
import { find } from 'lodash';
const authRouter = express.Router();

const loginBase = [
    {
        login: 'admin',
        password: 'admin password'
    }, {
        login: 'test',
        password: 'test password'
    }
]

authRouter.route('/auth').post(function (req, res) {
    const isInBase = find(loginBase, {login: req.body.login, password: req.body.password});
    if(!isInBase) {
            res.status(403).json("There is no such user");
    } else {
        next();
    }
});

export default authRouter;