var app =angular.module('ngRoutingDemo', ['ngRoute','ngAnimate', 'ngSanitize', 'ui.bootstrap']);
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
    .when('/students', {
        templateUrl: 'students.html',
        controller: 'studentsCtrl'
    })
    .otherwise({
        template : "<h1>None</h1><p>Content Not Found</p>"
    });
});