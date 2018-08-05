import express from 'express';
const userRouter = express.Router();
import userControllers from '../controllers/userControllers';

userRouter.param('id', function(req, res, next, id) {
    req.userId = id;
    next();
})

userRouter.get('/users', userControllers.getAllUsers);

userRouter.route('/users/:id')
    .get(userControllers.getUserById)
    .delete(userControllers.deleteUserById);

export default userRouter;