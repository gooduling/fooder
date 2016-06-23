var mocks = require('node-mocks-http');
var express = require('express');
var middleware = require('server/lib/middleware/errorHandler');

describe('MIDDLEWARE: error handler', function() {
   var app, req, res, err, errSpy;

   beforeEach(function() {
    err = new Error();
    err.message = 'Test error.'
    app = express();
    req = mocks.createRequest();
    res = mocks.createResponse();
    errSpy = sinon.spy(res, 'end');
   });

   afterEach(function() {
       app = null;
       req = null;
       res = null;
       err = null;
       errSpy.restore();
   });

   it('Should add err.message', function(done) {
     middleware()(err, req, res);
     err.should.have.property('message');
     done();
   });

   it('Should has correct message', function(done) {
     middleware()(err, req, res);
     err.message.should.be.exactly('Test error.');
     done();
   });

   it('Should call res.end', function(done) {
     middleware()(err, req, res);
     errSpy.called.should.be.ok;
     done();
   });
})
