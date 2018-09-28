app.controller("userCtrl", ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {

    var updatedData = {};
    var emailparam;
    $scope.open = function(email) {
        emailparam = email;
        console.log(emailparam);
        var modalInstance = $uibModal.open({
            templateUrl: 'lalit.html',
            controller: function($scope, $uibModalInstance) {
                $scope.submit = function() {
                    $uibModalInstance.close();
                    updatedData.userName = $scope.username;
                    updatedData.address = $scope.address;
                    updatedData.password = $scope.password;
                    update();
                };
            }
        })
    };

    var update = function() {
        console.log(emailparam);
        $http.put('/user/' + emailparam, updatedData).then(function(response) {
            refresh();
        })
    }


    var refresh = function() {
        $http.get('/user').then(function(response) {
            console.log("I got the data I requested");
            $scope.userlist = response.data;
            console.log($scope.userlist);
        });
    };

    refresh();


    $scope.adduser = function() {
        console.log($scope.username);
        $scope.data = { "userInfo": {} }
        $scope.data.userInfo.userName = $scope.username;
        $scope.data.userInfo.address = $scope.address;
        $scope.data.email = $scope.email;
        $scope.data.password = $scope.password;
        $scope.data.status = "activated";

        $http.post('/user', $scope.data).then(function(response) {
            console.log(response);
            refresh();
        });
    };

    $scope.deactivate = function(id) {
        console.log(id);
        $http.put('/status/' + id).then(function(response) {
            refresh();
        })
    }



    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/user/' + id).then(function(response) {
            refresh();
        });
    };



}]);