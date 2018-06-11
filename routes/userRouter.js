import express from 'express';
const userRouter = express.Router();
import { User } from '../models';

let myUsers = new User([
    'Homer', 'Bart', 'Lisa', 'Marge'
])

userRouter.get('/api/users', (req, res) => {
        res.json(myUsers.fetchAll());
    });

export default userRouter;