app.controller("companyCtrl", ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {

    var updatedData = {};
    var _id;

    $scope.open = function(id) {
        console.log("hii");
        _id = id;
        var modalInstance = $uibModal.open({
            templateUrl: 'lalit.html',
            controller: function($scope, $uibModalInstance) {
                $scope.submit = function() {
                    $uibModalInstance.close();
                    updatedData.companyName = $scope.companyname;
                    updatedData.faxno = $scope.faxno;
                    updatedData.registrationno = $scope.registrationno;
                    update();
                };
            }
        })
    };

    var update = function() {
        $http.put('/company/' + _id, updatedData).then(function(response) {
            refresh();
        })
    }










    var refresh = function() {
        $http.get('/companies').then(function(response) {
            console.log("I got the data I requested");
            $scope.companieslist = response.data;
            console.log($scope.userlist);
        });
    };

    refresh();

    $scope.addcompany = function() {
        console.log($scope.username);
        $scope.data = { "companyInfo": { "userInfo": {} } }
        $scope.data.companyInfo.userInfo.userEmail = $scope.useremail;
        $scope.data.companyInfo.fax = $scope.fax;
        $scope.data.companyInfo.registrationNo = $scope.registrationNo;
        $scope.data.companyInfo.status = "activated";
        $scope.data.companyName = $scope.companyname;

        $http.post('/company', $scope.data).then(function(response) {
            console.log(response);
            refresh();
        });
    };


    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/company/' + id).then(function(response) {
            refresh();
        });
    };

    $scope.deactivate = function(id) {
        console.log(id);
        $http.put('/companystatus/' + id).then(function(response) {
            refresh();
        })
    }


}]);