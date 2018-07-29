import mongoose from 'mongoose';
import users from '../data/users';

const userSchema = new mongoose.Schema({
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
            let newUser = new User(userData);
            newUser.save( (err, newUser) => {
                if (err) return console.error(err);
                console.log(newUser, ' created');
            });
        }
    })
});

export default User;