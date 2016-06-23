
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../models/user');

exports.setup = function (app) {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      function(email, password, cb) {
        User.findOne({email: email}).then(function(user) {
          cb(null, user && user.authenticate(password) ? user : false);
        }).catch(function(err) {
          cb(err);
        });
      }));


    passport.serializeUser(function(user, cb) {
      cb(null, user.email);
    });

    passport.deserializeUser(function(email, cb) {
      User.find({email: email}).then(function(user) {
        cb(null, user);
      }).catch(cb);
    });

    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize());
    app.use(passport.session());
};
