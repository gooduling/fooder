'use strict';

require('dotenv').load();
var log = function () {
    console.log.apply(console, arguments);
}
var mongoose = require('mongoose');
var Promise = require('bluebird');
var connection = require('../server/lib/db.connector.js');
var models = require('../server/models');
var UserModel = models.User;
var PlaceModel = models.Place;

log('start seeding data');

Promise
    .all([
        UserModel.remove(),
        PlaceModel.remove()
    ])
    .then(function () {
        return Promise.all([
            new UserModel({email: 'tse@ciklum.com', role: 'owner', password: 'qwerty'}).save(),
            new UserModel({email: 'vvy@ciklum.com', role: 'picker', password: '123456'}).save(),
            new UserModel({email: 'aul@ciklum.com', role: 'owner', password: '123456'}).save()
        ]);
    })
    .then(function (users) {
        console.log(users[2]._id);
        return Promise.all([
            new PlaceModel({
                owner_id: new mongoose.Types.ObjectId(users[0]._id),
                number: 16,
                level: 1,
                description: '',
                is_occupied: true
            }).save(),
            new PlaceModel({
                owner_id: new mongoose.Types.ObjectId(users[2]._id),
                number: 216,
                level: 2,
                description: 'free',
                is_occupied: false
            }).save()
        ])
    })
    .then(function (place) {
        log('seeding complete');
    })
    .catch(function (err) {
        log('something went wrong : %s\r\n %s', err.message, err.stack);
    })
    .finally(function () {
        connection.close();
    });