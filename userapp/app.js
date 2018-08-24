var app =angular.module('ngRoutingDemo', ['ngRoute'])
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'users.html',
        controller: 'usersCtrl'
    }).when('/users', {
        templateUrl: 'users.html',
        controller: 'usersCtrl'
    })
    .when('/user/:id', {
        templateUrl: 'singleUser.html',
        controller: 'userCtrl'
    })
    .when('/user/:id/update', {
        templateUrl: 'update.html',
        controller: 'userCtrl'
    })
    .otherwise({
        template : "<h1>None</h1><p>Content Not Found</p>"
    });
});