'use strict';

var passport = require('passport');
var ctrl = require('../controllers/userController');
var pmpAuth = require('../lib/middleware/authHandler')();

module.exports.setup = function(app) {

  app.post('/user/register', ctrl.register);

  app.post('/user/login', passport.authenticate('local'), ctrl.getProfile);

  app.post('/user/logout', pmpAuth.isAuthenticated(), ctrl.logout);

  app.get('/user/:id', pmpAuth.isAuthenticated(), ctrl.findOne);

  app.get('/user/isAuthorised', pmpAuth.isAuthenticated());

  app.get('/user', pmpAuth.isAuthenticated(), ctrl.getProfile);
};