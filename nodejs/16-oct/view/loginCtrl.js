app.controller("loginCtrl", ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.submit = function submit() {
        $scope.data = {};
        $scope.data.username = $scope.username;
        $scope.data.password = $scope.password;
        console.log($scope.username);
        console.log($scope.password);
        $http.post('/login', $scope.data).then(function(response) {
            console.log(response);
            if (response.data == 'Success') {
                $location.path('/success');
            } else {
                alert("email and password not match")
                $location.path('/');
            }
        });
    }
}]);