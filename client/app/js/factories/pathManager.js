'use strict';

pmpApp.factory('PathManager', function(AuthService, $q) {
    return {
        isUserLoggedIn:isUserLoggedIn
    };

    function isUserLoggedIn(){
        var deffered = $q.defer();
        AuthService.isAuthorized().then(function(isLoggedIn) {
            if(isLoggedIn) {
                if (window.location.hash === '#/login') {
                    //to prevent login page from flickering we reject promise
                    deffered.reject();
                    //todo: redirect to previous location if exists.
                    window.location.hash ='#/profile';
                } else {
                    deffered.resolve(isLoggedIn);
                }
            } else {
                if (window.location.hash !== '#/login') {
                    //preventing render template.
                    deffered.reject();
                    window.location.hash ='#/login';
                } else {
                    deffered.resolve(isLoggedIn)
                }
            }
        });
        return deffered.promise;
    }
});