import express from 'express';
import jwt from 'jsonwebtoken';
import { find } from 'lodash';
const authRouter = express.Router();

const loginBase = [
    {
        login: 'admin',
        password: 'admin password',
        email: "admin@ad.min",
        username: "Admin"
    }, {
        login: 'test',
        password: 'test password',
        email: "test@te.st",
        username: "Test"
    }
]

authRouter.route('/auth').post(function (req, res) {
    const user = find(loginBase, {login: req.body.login, password: req.body.password});
    if(!user) {
        const isLoginInBase = find(loginBase, {login: req.body.login});
        const isPasswordInBase = find(loginBase, {password: req.body.password});
        let errorData = "";
        if (!isLoginInBase) {
            errorData = "The login name is not right";
        } else if (!isPasswordInBase) {
            errorData = "Pasword name is not right";
        } else {
            errorData = "There is no such user";
        }

        res.status(404).send({"message": "Not Found", "data": errorData});
    } else {
        let data = {
            "user": {
                "email": user.email,
                "username": user.username
            }
        }
        let token = jwt.sign(data, 'someSecret', {expiresIn: 10});
        res.status(200).send({ "message": "OK", data, "token": token});
    }
});

export default authRouter;