var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngCookies'])
app.config(function($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: 'login.html',
            controller: 'loginCtrl'
        })
        .when('/user', {
            templateUrl: 'user.html',
            controller: 'userCtrl',
            authenticated: true
        })
        .when('/companies', {
            templateUrl: 'company.html',
            controller: 'companyCtrl',
            authenticated: true
        })
        .when('/error', {
            templateUrl: 'error.html'
        })
        .otherwise({
            template: "<h1>None</h1><p>Content Not Found</p>"
        });
});


app.run(["$rootScope", "$location", "myFactory",
    function($rootScope, $location, myFactory) {
        $rootScope.$on("$routeChangeStart",
            function(event, next, current) {
                if (next.$$route.authenticated) {
                    if (!myFactory.getAuthStatus()) {
                        $location.path('/');
                    }
                }
                if (next.$$route.originalPath == '/') {
                    if (myFactory.getAuthStatus()) {
                        $location.path(current.$$route.originalPath);
                    }
                }
            })
    }
])