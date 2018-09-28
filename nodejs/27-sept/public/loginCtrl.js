app.controller("loginCtrl", ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.submit = function submit() {
        $scope.data = {};
        $scope.data.email = $scope.email;
        $scope.data.password = $scope.password;
        console.log($scope.email);
        console.log($scope.password);
        $http.post('/login', $scope.data).then(function(response) {
            console.log(response.data[0]);
            $location.path(response.data[0]);
        });
    }
}]);