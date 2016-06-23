var mocks = require('node-mocks-http');
var express = require('express');

var placeRoutes = require('server/routes/place');
var placeController = require('server/controllers/placeController');

function buildResponse() {
  return mocks.createResponse({eventEmitter: require('events').EventEmitter})
}

describe('ROUTES: place', function () {
  var app, req, res, stub;

  before(function() {
    app = express();
    stub = sinon.stub(placeController, 'list');
    placeRoutes.setup(app);
  });

  beforeEach(function() {
    res = buildResponse();
  });

  afterEach(function () {
    req = null;
    res = null;
    if (stub) {
      stub.restore();
    }
  });

  describe('#get places list', function () {

    it('Should call placeController.list on GET request.', function (done) {
      //stub = sinon.stub(placeController, 'list').returns({});

      req = mocks.createRequest({
        method: 'GET',
        url: '/places'
      });
      //
      //res.on('end', function() {
      //  should(res.statusCode).be.equal(200);
      //  should(stub.called).be.ok();
      //  done();
      //});
      app.handle(req, res);
      stub.called.should.be.ok;
      done();
    });
  });
});
