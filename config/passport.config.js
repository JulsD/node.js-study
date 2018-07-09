import {Strategy as LocalStrategy } from 'passport-local';
import {Strategy as FacebookStrategy } from 'passport-facebook';
import {OAuthStrategy as GoogleStrategy } from 'passport-google-oauth';
import {OAuthStrategy as TwitterStrategy } from 'passport-twitter';

import { find } from 'lodash';
import loginBase from '../data/users.json';
import { User } from '../models';
import credentials from '../data/credentials';

let myUsers = new User(loginBase);

export default function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

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
        let user = myUsers.findOrCreateUser({"login": profile._json.name});
        if (user === undefined) { 
            return done(null, false, 'Bad user login name or password.');
        } else {
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
        } else {
            return done(null, user);
        }
      }
    ));

    passport.use(new TwitterStrategy({
        consumerKey: credentials.TWITTER_CONSUMER_KEY,
        consumerSecret: credentials.TWITTER_CONSUMER_SECRET,
        callbackURL: "http://localhost:8080/auth/twitter/callback"
      },
      function(token, tokenSecret, profile, done) {
        let user = find(loginBase, {"login": login});
        if ( user === undefined || user.password !== password) { 
            return done(null, false, 'Bad user login name or password.');
        } else {
            return done(null, user);
        }
      }
    ));

};

