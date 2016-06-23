'use strict';

//this middleware should be use as latest in the chain.
module.exports = function () {
    return function (err, req, res, next) {
        res.end('Error: ' + res.statusCode + '\nData: ' + err);
    }
};
