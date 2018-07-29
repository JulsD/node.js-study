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
    .exec()
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

userRouter.route('/api/users/:id')
.get((req, res) => {
    User
    .findOne({_id: req.userId}, (err, results) => {
        if (err) return console.error(err);
    })
    .select('-__v')
    .exec()
    .then(user => {
        if(user) {
            const response = {
                username: user.username,
                email: user.email,
                password: user.password,
                age: user.age,
                _id: user._id,
                request: {
                    type: 'DELETE',
                    url: `/api/users/${user._id}`,
                    description: 'To delete user'
                }
            }
            res.status(200).json(response);
        } else {
            res.status(404).json({massage: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    })
})
.delete((req, res, next) => {
    User
    .remove({_id: req.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User deleted",
            request: {
                type: 'GET',
                url: 'api/users',
                description: 'To get all users'
            }
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    })
});

export default userRouter;