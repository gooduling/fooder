'use strict';

var main = require('./main'),
    place = require('./place'),
    user  = require('./user');

module.exports.setup = function(app) {
    main.setup(app);
    place.setup(app);
    user.setup(app);
};