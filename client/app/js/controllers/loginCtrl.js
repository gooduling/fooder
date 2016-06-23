'use strict';
(function(app) {
    app.controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($scope, $location, AuthService) {
        $scope.loginCtrl = {
            userCredentials: {},
            loginFailed: false
        };

        // TODO: remember me
        $scope.login = function () {
            $scope.loginCtrl.loginPromise = AuthService.login($scope.loginCtrl.userCredentials.email,
                $scope.loginCtrl.userCredentials.password).then(function () {
                    $location.path('/profile');
                }, function () {
                    $scope.loginCtrl.loginFailed = true;
                })
        };

        $scope.register = function() {
            $location.path('/create');
        };
    }
})(pmpApp);