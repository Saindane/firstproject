app.controller("loginCtrl", ['$scope', '$http', '$location', 'myFactory', function($scope, $http, $location, myFactory) {

    $scope.submit = function submit() {
        $scope.data = {};
        $scope.data.email = $scope.email;
        $scope.data.password = $scope.password;
        console.log($scope.email);
        console.log($scope.password);
        myFactory.doLogin($scope.data);
    }
}]);