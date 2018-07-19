import express from 'express';
const userRouter = express.Router();
import models from '../models';
import { tokenCheck } from '../middlewares';

userRouter.get('/api/users', tokenCheck, (req, res) => {
    models.user.findAll().then(users => {
        res.json(users);
    });
});

export default userRouter;