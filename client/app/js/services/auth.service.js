'use strict';
(function (app) {
    app.service('AuthService', function ($resource, $q, $location) {
        var authApi = $resource('/user/:id/:action', {id: '@_id'},
            {
                register: {method: 'POST', params: {action: 'register'}},
                login: {method: 'POST', params: {action: 'login'}},
                logout: {method: 'POST', params: {action: 'logout'}},
                isAuthorised: {method: 'GET', params: {action: 'isAuthorised'}},
                getUserProfile: {method: 'GET'}
            });

        var userLoggedIn = null;
        var userProfile = null;

        this.login = function(email, password) {
            return authApi.login({email: email, password: password}).$promise.then(function(response) {
                userLoggedIn = true;
                userProfile = angular.extend({}, response);//{email: response.email, role: response.role};
                return response;
            });
        };

        this.logout = function() {
            userLoggedIn = false;
            authApi.logout().$promise.then(function() {
                $location.path('/login');
            }, function() {
                //restore on logout fail.
                userLoggedIn = true;
            });
        };

        this.isAuthorized = function() {
            var deffered = $q.defer();
            if (userLoggedIn !== null) {
                deffered.resolve(userLoggedIn);
            } else {
                authApi.isAuthorised().$promise.then(function() {
                    userLoggedIn = true;
                    deffered.resolve(userLoggedIn);
                }, function() {
                    userLoggedIn = false;
                    deffered.resolve(userLoggedIn);
                });
            }
           return deffered.promise;
        };

        this.getUserProfile = function() {
            return this.isAuthorized().then(function() {
                if (userProfile) {
                    return userProfile;
                } else {
                    return authApi.getUserProfile().$promise.then(function(response) {
                        userProfile = angular.extend({}, response);
                        return userProfile;
                    });
                }
            });
        }
    });
}(pmpApp));