angular.module("app").controller("calculateCtrl",['$scope',function($scope){
    $scope.model = {};
    $scope.result = null;
    $scope.options = ["add","multiply","divide","substract"];
    $scope.submit = function(model)
    {
        if($scope.model.option === "add")
        {
            $scope.result  = add($scope.model.number1,$scope.model.number2);
        }
        else if( $scope.model.option === "multiply")
        {
            $scope.result  =multiply($scope.model.number1,$scope.model.number2);
        }
        else if( $scope.model.option === "divide")
        {
            $scope.result  =divide($scope.model.number1,$scope.model.number2);
        }
        else  if( $scope.model.option === "substract")
        {
            $scope.result  =substract($scope.model.number1,$scope.model.number2);
        }
    }

//addition function
 function add(number1,number2)
 {
  return number1+number2;
 } 
 //substraction function
 function multiply(number1,number2)
 {
  return number1*number2;
 } 
//divide function
 function divide(number1,number2)
 {
  return number1/number2;
 } 
 //substract function
 function substract(number1,number2)
 {
  return number1-number2;
 } 
   
}])