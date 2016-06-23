'use strict';
(function(app) {
    app.controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl($scope, Place, AuthService) {
        $scope.profile = {};

        AuthService.getUserProfile().then(function(userProfile) {
            angular.extend($scope.profile, userProfile);

            if (userProfile.role === 'owner') {
                $scope.profile.ownPlace = Place.getOwn();
            } else {
                $scope.profile.availablePlaces = Place.query();
            }
        });

        $scope.rentPlace = function(availablePlace, placeIndex) {
            availablePlace.$rent().then(function() {
                console.log('Rent success.');
                $scope.profile.availablePlaces.splice(placeIndex, 1);
            }, function() {
                //todo: notify user that action failed.
                console.log('Rent failed.');
            });
        };

        $scope.leasePlace = function() {
            if ($scope.profile.role === 'owner' &&
                $scope.profile.ownPlace &&
                angular.isDefined($scope.profile.ownPlace.is_occupied) &&
                !$scope.profile.ownPlace.is_occupied &&
                !$scope.profile.ownPlace.is_available) {
                Place.lease({'owner_id': $scope.profile.id}).$promise.then(function() {
                    $scope.profile.ownPlace.is_available = true;
                });
            }
        };

        $scope.cancelLease = function() {
            Place.cancelLease().$promise.then(function() {
                $scope.profile.ownPlace.is_available = false;
            }, function() {
                //if error happened when cancelling lease it possible place already occupied. So we will read new status.
                //todo: provide special status code when place already occupied.
                Place.getOwn().$promise.then(function(ownPlace) {
                    $scope.profile.ownPlace = ownPlace;
                });
            });
        };

        $scope.logout = function() {
            AuthService.logout();
        };
    }
})(pmpApp);