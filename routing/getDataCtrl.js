app.controller("getDataCtrl",['$scope','$http', function($scope, $http) { 

  $http.get("https://jsonplaceholder.typicode.com/posts").then(
      function(responseText)
        {
        $scope.datas = responseText ; 
        },
        function(e){ 
      })

}]);