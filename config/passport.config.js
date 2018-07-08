import {Strategy as LocalStrategy } from 'passport-local';
import { find } from 'lodash';
import loginBase from '../data/users.json';

export default function(passport) {

    // passport.serializeUser(function(user, done) {
    //     done(null, user.id);
    // });

    // passport.deserializeUser(function(id, done) {
    //     User.findById(id, function(err, user) {
    //         done(err, user);
    //     });
    // });

    passport.use(new LocalStrategy({
        usernameField : 'login',
        passwordField : 'password',
        session: false
    },
    function(login, password, done) {
        let user = find(loginBase, {"login": login});

        if ( user === undefined || user.password !== password) {
            return done(null, false, 'Bad user login name or password.');
        } else {
            return done(null, user);
        }
    }));

};

