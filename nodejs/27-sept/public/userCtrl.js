app.controller("userCtrl", ['$scope', '$http', '$uibModal', 'userServices', function($scope, $http, $uibModal, userServices) {

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

    var refresh = function() {
        userServices.getAllUsers().then(function(response) {
                $scope.userlist = response.data;
            },
            function(error) {

            });
    };

    refresh();


    var update = function() {
        console.log(emailparam);
        userServices.updateData(emailparam, updatedData).then(function(response) {
            alert(response.data);
            refresh();
        })
    }



    $scope.adduser = function() {
        console.log($scope.username);
        $scope.data = { "userInfo": {} }
        $scope.data.userInfo.userName = $scope.username;
        $scope.data.userInfo.address = $scope.address;
        $scope.data.email = $scope.email;
        $scope.data.password = $scope.password;
        $scope.data.status = "activated";

        userServices.setUser($scope.data).then(function(response) {
            alert(response.data);
            refresh();
        });
    };

    $scope.deactivate = function(id) {
        userServices.deactiveUser(id).then(function(response) {
            alert(response.data);
            refresh();
        })
    }


    $scope.remove = function(id) {
        if (confirm("Are you sure you want to delete this item?")) {
            userServices.deleteUser(id).then(function(response) {
                refresh();
            });
        }

    };



}]);