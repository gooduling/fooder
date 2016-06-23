'use strict';

var User = require('../models').User;
var UserTO = require('../transfer_objects/user')();

module.exports = {

    register: function (req, res, next) {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        newUser.save().then(function(user) {
            console.log('User ' + req.body.email + ' has registered');
            user = _.pick(user, ['email', 'role', '_id']);
            res.json({data: user, status: 'success'});
        }, function(err) {
            console.error(err);
            next(err);
        });
    },
    //todo: uncomment if need special logic on login.
    //login: function(req, res, next) {
    //    User.findOne({email: req.session.passport['user']}).then(function(user) {
    //        console.log(user);
    //        res.json(new UserTO(user));
    //    }, function(err) {
    //        next(err);
    //    });
    //},

    logout: function(req, res) {
        req.logOut();
        res.status(200).json({
            status: 'success'
        });
    },

    findOne: function(req, res, next) {
        var id = req.params.id;

        User.findOne({_id: id}).then(function(user) {
            console.log(user);
            res.json(new UserTO(user));
        }, function(err) {
            next(err);
        });
    },

    getProfile: function(req, res, next) {
        User.findOne({email: req.session.passport['user']}).then(function(user) {
            console.log(user);
            res.json(new UserTO(user));
        }, function(err) {
            next(err);
        });
    }
};
