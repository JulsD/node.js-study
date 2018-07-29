import mongoose from 'mongoose';
import users from '../data/users';

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        reqired: true
    },
    email: {
        type: String,
        reqired: true
    },
    password: {
        type: String,
        reqired: true
    },
    age: Number
  });

const User = mongoose.model('User', userSchema);

users.forEach(userData => {
    User.findOne(userData, function (err, user) {
        if (err) throw err;
        if (!user) {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: user.username,
                email: user.email,
                password: user.password,
                age: user.age
            }); 
            newUser.save( (err, newUser) => {
                if (err) return console.error(err);
                console.log(newUser, ' created');
            });
        }
    })
});

export default User;