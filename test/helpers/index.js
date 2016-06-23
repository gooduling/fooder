require('dotenv').load();

var colors = require('colors/safe')
  , sinon = require('sinon')
  , should = require('should');

global.sinon = sinon;
global.should = should;

console.log(colors.cyan('test helpers loaded, node path is "%s"'), process.env.NODE_PATH);