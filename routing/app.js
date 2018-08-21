var app =angular.module('ngRoutingDemo', ['ngRoute'])
app.config(function ($routeProvider) {
    $routeProvider.when('/display', {
        templateUrl: '/display.html',
        controller: 'display'
    })
    .when('/calculator', {
        templateUrl: 'calculator.html',
        controller: 'calculateCtrl'
    })
    .when('/post', {
        templateUrl: 'post.html',
        controller: 'getDataCtrl'
    })
    .when('/post/submit', {
        templateUrl: 'submit.html',
        controller: 'postDataCtrl'
    })
    .when('/calculator/:paramNumber1', {
        templateUrl: 'paramOne.html',
        controller: 'calculateCtrl'
    })
    .when('/calculator/:paramNumber1/:paramNumber2', {
        templateUrl: 'paramOne.html',
        controller: 'calculateCtrl'
    })
    .when('/personal', {
        templateUrl: 'info.html',
        controller: 'pInformationCtrl'
    })
    .otherwise({
        template : "<h1>None</h1><p>Content Not Found</p>"
    });
});