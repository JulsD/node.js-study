import express from 'express';
const userRouter = express.Router();
import { User } from '../models';

userRouter.param('id', function(req, res, next, id) {
    req.userId = id;
    next();
})

userRouter.get('/api/users', (req, res) => {
    User
    .find(function (err, results) {
        if (err) return console.error(err);
    })
    .select('-__v')
    .then(docs => {
        const response = {
            count: docs.length,
            users: docs.map(doc => {
                return {
                    username: doc.username,
                    email: doc.email,
                    password: doc.password,
                    age: doc.age,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: `/api/users/${doc._id}`
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    })
});

userRouter.get('/api/users/:id', (req, res) => {
    User
    .findOne({_id: req.userId}, (err, results) => {
        if (err) return console.error(err);
    })
    .select('-__v')
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    })
});

export default userRouter;