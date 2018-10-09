app.service("companyServices", ["$http", '$rootScope', function($http, $rootScope) {

    this.getAllCompanies = function() {
        return $http.get("/companies");
    }

    this.getSingleCompany = function(_id) {
        return $http.get("/company/" + _id);
    }

    this.updateData = function(_id, updatedData) {
        return $http.put('/company/' + _id, updatedData);
    }

    this.addCompany = function(data) {
        return $http.post('/company', data);
    }

    this.deactiveCompany = function(id, value) {
        return $http.put('/companystatus/' + id, value);
    }

    this.deleteCompany = function(id) {
        return $http.delete('/company/' + id);
    }

    this.logout = function() {
        return $http.get('/logout');
    }

}]);