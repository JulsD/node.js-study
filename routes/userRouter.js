import express from 'express';
const userRouter = express.Router();
import { User } from '../models';

userRouter.get('/api/users', (req, res) => {
    User.find(function (err, results) {
        if (err) return console.error(err);
        res.json(results);
    });
});

export default userRouter;