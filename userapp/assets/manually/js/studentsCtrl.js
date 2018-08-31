
app.controller("studentsCtrl",['$scope','$uibModal','userService',function($scope,$uibModal,userService) { 

     $scope.datas;
     
//This function is for to  open the modal 
 $scope.open = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'lalit.html',
      controller: 'studentCtrl'
      })
    };

//This is take data from studentservice
$scope.$on('eventName', function (event, data) {
      $scope.datas = userService.getStudents();
});

   

}]);


