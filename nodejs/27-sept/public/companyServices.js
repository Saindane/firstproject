app.service("companyServices", ["$http", '$rootScope', function($http, $rootScope) {

    this.getAllCompanies = function() {
        return $http.get("/companies");
    }

    this.updateData = function(_id, updatedData) {
        return $http.put('/company/' + _id, updatedData);
    }

    this.addCompany = function(data) {
        return $http.post('/company', data);
    }

    this.deactiveCompany = function(id) {
        return $http.put('/companystatus/' + id);
    }

    this.deleteCompany = function(id) {
        return $http.delete('/company/' + id);
    }

}]);