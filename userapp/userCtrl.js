app.controller("userCtrl",['$scope','$http','$routeParams', '$location','userService',function($scope, $http,$routeParams,$location,userService) { 
  
    $scope.id = $routeParams.id;
    $scope.user = {}; 
    $scope.model = {};
   

 //This function is for checking url
   $scope.init = function(){
       if($location.path() === "/user/"+$scope.id){
          $scope.get();
       }
   }


    //This function is for accessing single userData
    $scope.get = function(){ 

       //Data is coming from ownServices    
       userService.getSingleUser($scope.id).then(

        function(response){
           $scope.ngShow = true; 
           $scope.user = response.data.data ; 
          },

        function(error){ 
          $scope.ngShow = false; 
          $scope.ngShowData = true;
          })
       
        }
    
    
    //This function is for updating single userData
      $scope.update = function(){

        $scope.model.id = $scope.id;
        $scope.model.first_name = $scope.firstName;
        $scope.model.last_name = $scope.lastName;
        $scope.model.avatar = $scope.avatar;

    //Data is coming from ownServices    
        userService.updateData($scope.id,$scope.model).then(

            function(response){
               $scope.click = true;
               $scope.success = true;
              },

            function(error){ 
                $scope.success = false;
                $scope.error = true;
              })
      
       }
    
    }]);


