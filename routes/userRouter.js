import express from 'express';
const userRouter = express.Router();
import { User } from '../models';
import { tokenCheck } from '../middlewares';
import usersMock from '../data/users.json';

let myUsers = new User(usersMock);

userRouter.get('/api/users', tokenCheck, (req, res) => {
        res.json(myUsers.fetchAll());
    });

export default userRouter;