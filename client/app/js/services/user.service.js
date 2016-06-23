'use strict';
(function (app) {
    app.service('User', function () {

        class User {
            constructor () {
                this._isLoggedIn = false;
                this._data = {};
            }

            init (data) {
                if (_.isObject(data)) {
                    _.assign(this._data, data);
                }
            }

            login () {
                this._isLoggedIn = true;
            }

            logout () {
                this._isLoggedIn = false;
            }

        }

        return User;

    });
}(pmpApp));