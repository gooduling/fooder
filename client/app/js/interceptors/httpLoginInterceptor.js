'use strict';
pmpApp.service('httpLoginInterceptor', ['$location', '$q', function($location, $q) {

    this.responseError = function (rejection) {
        if (rejection.status === 401 && $location.$$path !== "/resetPassword") {
            if ($location.path() !== '/login') {
                $location.path('/login');
            }
        }
        return $q.reject(rejection);
    };
}]);
