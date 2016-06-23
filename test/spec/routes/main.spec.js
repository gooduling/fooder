var mocks = require('node-mocks-http');
var express = require('express');

var indexRoutes = require('server/routes/main');

function buildResponse() {
  return mocks.createResponse({eventEmitter: require('events').EventEmitter})
}


describe('ROUTES: main', function () {
  var app, req, res;

  before(function() {
    app = express();
    indexRoutes.setup(app);
  });

  beforeEach(function() {
    res = buildResponse();
  });

  afterEach(function () {
    req = null;
    res = null;
  });

  describe('#entry point', function () {

    it('Should return correct view name - index.html.', function (done) {
      req = mocks.createRequest({
        method: 'GET',
        url: '/'
      });

      res.on('render', function() {
        res.statusCode.should.be.equal(200);
        res._getRenderView().should.be.equal('index.html');
        done();
      });
      app.handle(req, res);
    });
  });
});
