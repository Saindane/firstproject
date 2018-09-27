app.controller("userCtrl", ['$scope', '$http', function($scope, $http) {

    $scope.adduser = function() {
        $scope.data = {}
        $scope.data.
        $http.post('/contactlist', $scope.data).success(function(response) {
            console.log(response);
            refresh();
        });
    };

    var refresh = function() {
        $http.get('/user').then(function(response) {
            console.log("I got the data I requested");
            $scope.userlist = response.data;
            console.log($scope.userlist);
        });
    };

    refresh();

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/user/' + id).then(function(response) {
            refresh();
        });
    };


}]);