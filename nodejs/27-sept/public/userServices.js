app.service("userServices", ["$http", '$rootScope', function($http, $rootScope) {

    this.getAllUsers = function() {
        return $http.get("/user");
    }

    this.getSingleUser = function(emailparam) {
        return $http.get("/user/" + emailparam);
    }


    this.updateData = function(emailparam, updatedData) {
        return $http.put('/user/' + emailparam, updatedData);
    }

    this.setUser = function(data) {
        return $http.post('/user', data);
    }

    this.deactiveUser = function(id) {
        return $http.put('/status/' + id);
    }

    this.activeUser = function(id) {
        return $http.put('/activestatus/' + id);
    }

    this.deleteUser = function(id) {
        return $http.delete('/user/' + id);
    }


}]);