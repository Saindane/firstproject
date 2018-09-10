var express = require('express');
var app = express();

var objects = [{"id":1,"name":"Alex","age":22},
               {"id":2,"name":"Root","age":25},
               {"id":3,"name":"Kitter","age":27},
               {"id":4,"name":"Ali","age":29}]

//url = http://localhost:8087/abc/ or http://localhost:8087/abc/1
//This responds to optional params and send data which is matches that id
app.get('/abc/:id?', function (req, res) {
    if(typeof req.params.id === "undefined")
    {
        res.send("Home Page");
    }
   var id = parseInt(req.params.id);
   objects.forEach(function (obj) {
   if(obj.id === id){
       res.send(obj);
   }
});

});


//url = http://localhost:8087/users/1
//This responds to route params and send data which is matches that id
 app.get('/users/:id', function (req, res) {


        var id = parseInt(req.params.id);
        var flag = false;
        var user;
   
        
       objects.forEach(function (obj) {
        if(obj.id === id){
           user = obj;
           flag = true;
        }
   });

   
      if(flag === true) {
         res.send(user);
     }else{
         res.send("User Information not Found");
     }   

});


//url =  http://localhost:8087/user?name=Alex
//This responds to queryString and send data which is matches that name
app.get('/user', function (req, res) {

    var name = req.query.name;
    var flag = false;
    var user;

    
   objects.forEach(function (obj) {
    if(obj.name === name){
       user = obj;
       flag = true;
    }
});

  if(flag === true) {
     res.send(user);
 }else{
     res.send("User Information not Found");
 }   

});


 var server = app.listen(8087, function () {

    var host = server.address().address
    var port = server.address().port
 
    console.log("Example app listening at http://%s:%s", host, port)
 })