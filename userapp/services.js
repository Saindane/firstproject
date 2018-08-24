//Custome services is created
app.service("userService",["$http",function($http){
       
    this.getAllUsers = function(){
        return $http.get("https://reqres.in/api/users");
    }
     
    this.getSingleUser = function(id){
     return $http.get("https://reqres.in/api/users/"+id);
    }

    this.updateData = function(id,model){
     return  $http.post("https://reqres.in/api/users/"+id,model);
    }
    
 }]);
