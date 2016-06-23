var mocks = require('node-mocks-http');
var express = require('express');
var auth = require('server/lib/auth');
var userRoutes = require('server/routes/user');

function buildResponse() {
  return mocks.createResponse({eventEmitter: require('events').EventEmitter})
}

describe('CONTROLLER: userController', function() {
  var app, req, res, stub, testData;

  before(function() {
    app = express();
    userRoutes.setup(app);
    auth.setup(app);
  });

  beforeEach(function() {
    res = buildResponse();
  });

  afterEach(function() {
    req = null;
    res = null;
    testData = null;
  });

  describe('#login', function() {
    // TODO
    // it('Should raise an error if username/password are not provided', function(done) {
//       req = mocks.createRequest({
//         method: 'POST',
//         url: '/user/login',
//         params: {
//           email: 'tse@ciklum.com',
//           password: 'qwerty'
//         }
//       });
//
//       res.on('end', function() {
//         res.statusCode && res.statusCode.should.be.equal(200); // TODO fix passport auth
//         done();
//       });
//
//       app.handle(req, res);
//
//        // {
// //        status: 'fail',
// //        code: 400,
// //        message: 'Missing username/password'
// //        }
//
//     });

    it('Should raise an error if user is not found', function() {
      /*
       {
       status: 'fail',
       code: 404,
       message: 'User with such email does not exist'
       }
       */
    });

    it('Should raise an error if a password is not match', function() {
      /*
       {
       status: 'fail',
       code: 401,
       message: 'Password not match'
       }
       */
    });

    it('Should respond OK if user data is correct', function() {
      /*
       {
       status: 'success',
       code: 200
       }
       */
    });

  });

  describe('#register', function() {

    it('Should redirect to error if parameters are not ok', function() {

    });

    it('Should create a new user if a model is valid ', function() {

    });

    it('Should show validation error if a model is invalid ', function() {

    });
  });
});