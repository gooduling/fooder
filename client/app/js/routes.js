pmpApp.config(function($routeProvider, $httpProvider) {
    var authResolver = {
        isLoggedIn: function(PathManager) {
            return PathManager.isUserLoggedIn()
        }
    };

    $routeProvider.
        when('/login', {templateUrl: 'app/partials/login.tpl.html', controller: 'LoginCtrl', resolve: authResolver}).
        when('/create', {templateUrl: 'app/partials/register.tpl.html', controller: 'RegisterCtrl'}).
        when('/profile', {templateUrl: 'app/partials/profile.tpl.html', controller: 'ProfileCtrl', resolve: authResolver}).
        otherwise({redirectTo: '/login'});

    $httpProvider.interceptors.push('httpLoginInterceptor');
}).run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
        //not sure about this logic. Looks when route promise rejected redirect doesn't work.
        if ($location.path() !== '/login') {
            $location.path('/login');
        }
    });
});