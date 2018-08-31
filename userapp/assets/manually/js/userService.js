//Custome services is created
app.service("userService",["$http", '$rootScope',function($http,$rootScope){

     var students = [];   

    this.getAllUsers = function(){
        return $http.get("https://reqres.in/api/users");
    }
     
    this.getSingleUser = function(id){
     return $http.get("https://reqres.in/api/users/"+id);
    }

    this.updateData = function(id,model){
     return  $http.post("https://reqres.in/api/users/"+id,model);
    }

    //This student service
    //This for setting in student array
   this.setStudent = function(student){
        students.push(student);
        //In that broadcase is use
        $rootScope.$broadcast('eventName');
    }
    
  //This is for sending student array
    this.getStudents = function(){
        return students;
    }

 }]);
