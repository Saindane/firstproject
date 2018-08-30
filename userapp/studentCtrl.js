
app.controller("studentCtrl",['$scope','$uibModalInstance','userService', '$rootScope', function($scope,$uibModalInstance,userService, $rootScope) { 
 
   
     $scope.student = {};

    //This function give todays date
    $scope.today = function() {
        $scope.dt = new Date();
        };
        $scope.today();
      
    //This function for open the calender    
     $scope.open1 = function() {
        $scope.popup1.opened = true;
        };
    
    //THis function for close the calender
    $scope.popup1 = {
        opened: false
        };
    
    //This is related to select classes
    $scope.classes = ["1", "2", "3","4","5"];

    //This function call when form is submited
    $scope.submit = function(){

      $uibModalInstance.close();
      $scope.student.id = $scope.id;
      $scope.student.firstName = $scope.firstName;
      $scope.student.lastName = $scope.lastName;
      $scope.student.dob = $scope.dt;
      $scope.student.class = $scope.class;
    
    //This is calling method from services  
      userService.setStudent($scope.students);





      }
    
  
    
    
    }]);
    
    
    