'use strict';

var ctrl = require('../controllers/placeController');
var pmpAuth = require('../lib/middleware/authHandler')();

exports.setup = function (app) {
    app.get('/places/own', pmpAuth.isAuthenticated(), ctrl.getOwnPlace);

    app.get('/places', pmpAuth.isAuthenticated(), ctrl.list);

    app.post('/places/:id/rent', pmpAuth.isAuthenticated(), ctrl.rent);

    app.post('/places/:id/rent/cancel', pmpAuth.isAuthenticated(), ctrl.cancelRent);

    app.post('/places/lease', pmpAuth.isAuthenticated(), ctrl.lease);

    app.post('/places/lease/cancel', pmpAuth.isAuthenticated(), ctrl.cancelLease);
};