var app = angular.module('myApp', ['ngRoute'])
app.config(function($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: 'login.html',
            controller: 'loginCtrl'
        })
        .when('/user', {
            templateUrl: 'user.html',
            controller: 'userCtrl'
        })
        .otherwise({
            template: "<h1>None</h1><p>Content Not Found</p>"
        });
});