app.controller("companyCtrl", ['$scope', '$http', '$uibModal', 'companyServices', '$location', function($scope, $http, $uibModal, companyServices, $location) {

    var updatedData = {};
    var _id;

    var refresh = function() {
        companyServices.getAllCompanies().then(function(response) {
                $scope.companieslist = response.data;
            },
            function(error) {
                $location.path('/error');
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

        companyServices.addCompany($scope.data).then(function(response) {
                alert(response.data);
                refresh();
            },
            function(error) {
                $location.path('/error');
            });
    };

    $scope.edit = function(id) {
        _id = id;
        companyServices.getSingleCompany(_id).then(function(response) {
                $scope.datas = response.data[0];
                $scope.useremail = $scope.datas[0].companyInfo.userInfo.userEmail[0];
                $scope.fax = $scope.datas[0].companyInfo.fax;
                $scope.registrationNo = $scope.datas[0].companyInfo.registrationNo;
                $scope.companyname = $scope.datas[0].companyName;
                $scope.value = true;
                $scope.hidebutton = true;
            },
            function(error) {
                $location.path('/error');
            })
    }

    $scope.updatecompany = function() {
        updatedData.companyName = $scope.companyname;
        updatedData.faxno = $scope.fax;
        updatedData.registrationno = $scope.registrationNo;
        updatedData.useremail = $scope.useremail;
        console.log(updatedData);
        companyServices.updateData(_id, updatedData).then(function(response) {
                alert(response.data);
                refresh();
                $scope.companyname = "";
                $scope.fax = "";
                $scope.registrationNo = "";
                $scope.useremail = "";
                $scope.value = false;
                $scope.hidebutton = false;
            },
            function(error) {
                $location.path('/error');
            })
    }

    $scope.deactivate = function(id) {
        console.log(id);
        companyServices.deactiveCompany(id).then(function(response) {
                refresh();
            },
            function(error) {
                $location.path('/error');
            })
    }

    $scope.activeCompany = function(id) {
        console.log(id);
        companyServices.activeCompany(id).then(function(response) {
                refresh();
            },
            function(error) {
                $location.path('/error');
            })
    }

    $scope.remove = function(id) {
        if (confirm("Are you sure you want to delete this item?")) {
            companyServices.deleteCompany(id).then(function(response) {
                    refresh();
                },
                function(error) {
                    $location.path('/error');
                });
        }
    };


}]);