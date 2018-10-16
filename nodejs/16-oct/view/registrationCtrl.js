app.controller("registrationCtrl", ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.registration = function registration() {
        $scope.data = {};
        $scope.data.name = $scope.name;
        $scope.data.username = $scope.username;
        $scope.data.password = $scope.password;

        $http.post('/adduser', $scope.data).then(function(response) {
            console.log(response);
            if (response.data == 'Success') {
                console.log(response.data);
                $location.path('/');
            } else {
                alert("username and password not match")
                $location.path('/');
            }
        });
    }
}]);