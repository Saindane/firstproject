app.controller("usersCtrl",['$scope','$http','userService', function($scope, $http,userService) { 
  $scope.users = {}; 
  $scope.index = null;

  //This function is for Displaying all users
  $scope.get = function(){

    userService.getAllUsers().then(

      function(response){
          $scope.users = response.data.data ; 
          $scope.displayTable = true;
        },

      function(error){ 
          $scope.displayTable = false;
          $scope.error = true;
      })
    }
  

  //This function is for Deleting single user
  $scope.delete = function(key){
     $scope.index = $scope.users.indexOf($scope.users[key]);
     $scope.users.splice($scope.index, 1);    
  }


}]);


