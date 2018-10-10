app.factory('myFactory', ['$http', '$cookies', '$location', function($http, $cookies, $location) {
    var userModel = {};
    userModel.doLogin = function(loginData) {
        console.log(loginData);
        return $http.post('/login', loginData).then(function(response) {
            console.log(response);
            if (response.data == 'user') {
                $cookies.put('auth', response);
                $location.path(response.data);
            } else {
                alert("email and password not match")
                $location.path('/');
            }
        });
    };

    userModel.getAuthStatus = function() {
        var status = $cookies.get('auth');
        if (status) {
            return true;
        } else {
            return false;
        }
    }
    return userModel;
}]);