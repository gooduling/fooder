'use strict';
(function(app) {
    app.controller('RegisterCtrl', RegisterCtrl);

    function RegisterCtrl($scope) {
        $scope.newUser = {};
    }
})(pmpApp);