import express from 'express';
import jwt from 'jsonwebtoken';
import { find } from 'lodash';
import passport from 'passport';

import loginBase from '../data/users.json';

const authRouter = express.Router();

authRouter.post('/auth/local', passport.authenticate('local', {session:false}), (req, res) => {
    const user = find(loginBase, {login: req.body.login, password: req.body.password});
    let data = {
        "user": {
            "email": user.email,
            "username": user.username
        }
    }
    let token = jwt.sign(data, 'someSecret', {expiresIn: 60});
    res.status(200).send({ "message": "OK", data, "token": token});
});

authRouter.get('/auth/facebook', passport.authenticate('facebook'));

authRouter.get('/auth/facebook/callback', passport.authenticate('facebook', { 
    successRedirect: '/', failureRedirect: '/login'
}));

authRouter.get('/auth/google', passport.authenticate('google', { 
    scope: 'https://www.google.com/m8/feeds'
}));

authRouter.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), function(req, res) {
    res.redirect('/');
});

authRouter.route('/auth').post((req, res) => {
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
        let token = jwt.sign(data, 'someSecret', {expiresIn: 60});
        res.status(200).send({ "message": "OK", data, "token": token});
    }
});

export default authRouter;