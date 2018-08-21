app.controller("postDataCtrl",['$scope','$http', function($scope, $http) { 
    $scope.model = {};
    $scope.submit = function()
    { 
        $scope.model.userId =  $scope.userid;
        $scope.model.title =  $scope.title;
        $scope.model.body = $scope.body;
    $http.post("https://jsonplaceholder.typicode.com/posts", $scope.model).then(
        function(responseText){console.log(responseText)},
        function(e){}
    )
    }
   
  }]);