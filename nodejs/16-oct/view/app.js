var app = angular.module('myApp', ['ngRoute'])
app.config(function($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: 'login.html',
            controller: 'loginCtrl'
        })
        .when('/registration', {
            templateUrl: 'registration.html',
            controller: 'registrationCtrl'
        })
        .when('/success', {
            templateUrl: 'success.html',
        })
        .otherwise({
            template: "<h1>None</h1><p>Content Not Found</p>"
        });
});