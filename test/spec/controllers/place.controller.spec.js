var mocks = require('node-mocks-http');
var express = require('express');
var Promise = require('bluebird');

var Place = require('server/models').Place;

var placeRoutes = require('server/routes/place');

var placeController = require('server/controllers/placeController');

function buildResponse() {
    return mocks.createResponse({eventEmitter: require('events').EventEmitter})
}

describe('CONTROLLER: placeController', function() {
    describe('#list', function() {
        var res, resSendSpy, stubFind, list;
        list = [{ data: 'data' }];

        beforeEach(function() {
            res = { send: new Function() };
            resSendSpy = sinon.spy(res, 'send');

            stubFind = sinon.stub(Place, 'find').returns(new Promise(function(resolve) {
                resolve(list);
            }));
        });

        afterEach(function() {
            if (stubFind) {
                stubFind.restore();
                stubFind = null;
            }
        });


        it('should call `Place.find({ is_occupied: false })`', function() {
            placeController.list(null, res, null);

            stubFind.calledWith({ is_occupied: false }).should.be.true;
        });

        it('should call `res.send()` with a result collection', function() {
            placeController.list(null, res, null);

            resSendSpy.calledWith(list).should.be.true;
        });
    });

    describe('#rent', function() {

    });

    describe('#cancelRent', function() {

    });

    describe('#lease', function() {

    });

    describe('#cancelLease', function() {

    });
});

/*
// It uses way through a router. Rewrite it
describe('CONTROLLER: placeController (through router)', function () {
    var app, req, res, stub, testData;

    before(function() {
        app = express();
        placeRoutes.setup(app);
    });

    beforeEach(function() {
        res = buildResponse();
    });

    afterEach(function () {
        req = null;
        res = null;
        testData = null;
        if (stub) {
            stub.restore();
            stub = null;
        }
    });

    describe('#list', function () {

        beforeEach(function () {
            testData = [{is_occupied: false}, {is_occupied: false}, {is_occupied: true}];

            stub = sinon.stub(Place, 'find').returns(new Promise(function (resolve) {
                resolve(testData);
            }));
        });

        it('Should return data received through `Place.find` method.', function (done) {
            req = mocks.createRequest({
                method: 'GET',
                url: '/places'
            });

            res.on('send', function() {
                should(stub.called).be.ok();
                should(res.statusCode).be.equal(200);
                should(res._getData()).be.equal(testData);
                done();
            });

            app.handle(req, res);
        });

        it('Should fail on `PUT` request.', function(done) {
            req = mocks.createRequest({
                method: 'PUT',
                url: '/places'
            });

            res.on('send', function() {
                // PUT method should not exist.
                // This part of the code should never execute.
                done(new Error('Response received.'));
            });

            app.handle(req, res, function() {
                done();
            });
        });
    });

    //describe('#register', function () {
    //
    //    it('Should create a new place if a model is valid ', function () {
    //
    //    });
    //
    //    it('Should show validation error if a model is invalid ', function () {
    //
    //    });
    //});
});
*/