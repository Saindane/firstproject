app.controller("companyCtrl", ['$scope', '$http', '$uibModal', 'companyServices', function($scope, $http, $uibModal, companyServices) {

    var updatedData = {};
    var _id;

    $scope.open = function(id) {
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

    var refresh = function() {
        companyServices.getAllCompanies().then(function(response) {
            $scope.companieslist = response.data;
        });
    };
    refresh();

    var update = function() {
        companyServices.updateData(_id, updatedData).then(function(response) {
            alert(response.data);
            refresh();
        })
    }


    $scope.addcompany = function() {
        console.log($scope.username);
        $scope.data = { "companyInfo": { "userInfo": {} } }
        $scope.data.companyInfo.userInfo.userEmail = $scope.useremail;
        $scope.data.companyInfo.fax = $scope.fax;
        $scope.data.companyInfo.registrationNo = $scope.registrationNo;
        $scope.data.companyInfo.status = "activated";
        $scope.data.companyName = $scope.companyname;

        companyServices.addCompany($scope.data).then(function(response) {
            alert(response.data);
            refresh();
        });
    };

    $scope.deactivate = function(id) {
        console.log(id);
        companyServices.deactiveCompany(id).then(function(response) {
            alert(response.data);
            refresh();
        })
    }

    $scope.remove = function(id) {
        if (confirm("Are you sure you want to delete this item?")) {
            companyServices.deleteCompany(id).then(function(response) {
                refresh();
            });
        }
    };


}]);