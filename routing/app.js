var app =angular.module('ngRoutingDemo', ['ngRoute'])
app.config(function ($routeProvider) {
    $routeProvider.when('/display', {
        templateUrl: '/display.html',
        controller: 'display'
    })
    .when('/calculator', {
        templateUrl: '/calculator.html',
        controller: 'calculateCtrl'
    })
    .when('/personal', {
        templateUrl: '/info.html',
        controller: 'pInformationCtrl'
    });
});