'use strict';

module.exports = function () {
    function isAuthenticated() {
        return function(req, res, next) {
            if (req.isAuthenticated()) {
                next();
            } else {
                res.send(401);
            }
        }
    }
    function haveARole(role) {
        return function(req, res, next) {
            if (req.session.user && req.session.user.role === role) {
                next();
            }
            else {
                res.send(401);
            }
        }
    }

    return {
        isAuthenticated: isAuthenticated,
        haveARole: haveARole
    };
};
