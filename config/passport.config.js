import {Strategy as LocalStrategy } from 'passport-local';
import {Strategy as FacebookStrategy } from 'passport-facebook';
import {OAuthStrategy as GoogleStrategy } from 'passport-google-oauth';
import { find } from 'lodash';
import loginBase from '../data/users.json';
import credentials from '../data/credentials';

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

    passport.use(new FacebookStrategy({
        clientID: credentials.FACEBOOK_APP_ID,
        clientSecret: credentials.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:8080/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        let user = find(loginBase, {"login": login});
        if ( user === undefined || user.password !== password) { 
            return done(null, false, 'Bad user login name or password.');
        }else {
            return done(null, user);
        }
    }));

    passport.use(new GoogleStrategy({
        consumerKey: credentials.GOOGLE_CONSUMER_KEY,
        consumerSecret: credentials.GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback"
      },
      function(token, tokenSecret, profile, done) {
        let user = find(loginBase, {"login": login});
        if ( user === undefined || user.password !== password) { 
            return done(null, false, 'Bad user login name or password.');
        }else {
            return done(null, user);
        }
      }
    ));

};

