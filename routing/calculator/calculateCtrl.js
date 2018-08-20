app.controller("calculateCtrl",['$scope','$routeParams', function($scope, $routeParams) {  

    var param1 = $routeParams.paramNumber1;
    var param2 = $routeParams.paramNumber2;
    $scope.number1 = param1;
    $scope.number2 = param2;
    $scope.options = ["add","multiply","divide","substract"];
    $scope.submit = function()
    {
        if($scope.option === "add")
        {
            $scope.result  = parseInt($scope.number1) + parseInt($scope.number2);
        }
        else if( $scope.option === "multiply")
        {
            $scope.result  = parseInt($scope.number1) * parseInt($scope.number2);
        }
        else if( $scope.option === "divide")
        {
            if($scope.number2 !== '0')
            {
            $scope.result  = parseInt($scope.number1) / parseInt($scope.number2);
            }
            else{ $scope.result ="Please insert proper number in Second number field";}
        }
        else  if( $scope.option === "substract")
        {
            $scope.result  = parseInt($scope.number1) - parseInt($scope.number2);
        }
    }

}]);