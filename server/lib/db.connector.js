'use strict';

/**
 * https://mlab.com/databases/pickmyplace
 * login: dr3am3r
 * password: qwerty123456
 */

var util = require('util');
var mongoose = require('mongoose');

var dbUri = util.format('mongodb://%s:%s@%s:%s/%s',
    process.env.MONGO_USER,
    process.env.MONGO_PASSWORD,
    process.env.MONGO_HOST,
    process.env.MONGO_PORT,
    process.env.MONGO_DB_NAME
);

mongoose.connection
    .on('error', function (err) {
        console.log('mongodb connection error: ' + err.message);
    })
    .on('close', function () {
        console.log('mongo connection is closed from ' + process.pid);
    })
    .once('open', function () {
        console.log('mongodb connected from ' + process.pid);
    });

mongoose.connect(dbUri);
module.exports = mongoose.connection;