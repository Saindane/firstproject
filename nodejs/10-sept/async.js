var express = require('express');
var app = express();
var async = require('async');

app.use(express.json());

var users = [{"id":1,"email":"abc@gmail.com","name":"Alex","age":22},
             {"id":2,"email":"xyz@gmail.com","name":"Root","age":22},
             {"id":3,"email":"acx@gmail.com","name":"Cook","age":22},
             {"id":4,"email":"abc@gmail.com","name":"Jimi","age":22}];




//url = http://localhost:8087/allusers
app.get('/allusers', function (req, res,/* next*/) {
    async.series([
        function(callback) {
              callback(null,users); 
          }
    ],function(error,result){
        res.send(result);
    }) 
});


//url = http://localhost:8088/users/?email=xyz@gmail.com or http://localhost:8088/users/1
app.get('/users/:id?', function (req, res,next) {
    var reqparam = parseInt(req.params.id);
    var reqquery = req.query.email ;
    var flag = false;

    async.series([

     function(callback){

            users.forEach(function (obj) {
                if(obj.id === reqparam){
    
                   flag = true;
                   user = obj;
    
                }else if(obj.email === reqquery)
                {
                    flag = true;
                    user = obj;
                }
             });

        if(flag === false) {
             callback('User not found');
           }
        else{
            callback();
        }
},
     function(callback){
         callback(null,user);
       }
    ],function(error,Data){
       if(error){
        res.send(error);
      }else{
        res.send(Data);
      }
    }) 
});

//url = http://localhost:8088/users/7
app.post('/users/:id?', function (req, res,next) {
    var reqparam = parseInt(req.params.id);
    var reqquery = req.query.email ;
    var flag = false;
    const newUser = {
        id : reqparam,
        name : req.body.name,
        age:req.body.age,
        email:req.body.email
      }

    async.series([

     function(callback){

        users.forEach(function (obj) {
            console.log(typeof obj.id);
            if(obj.id === reqparam){
               flag = true;
            }
         });

        if(flag === true) {
             callback('User is already added');
           }
        else{
           callback();
        }
},
    function(callback){
     users.push(newUser);
     callback(null,users)
  }

    ],function(error,done){
       if(error){
        res.send(error);
      }
      else{       
        res.send(done);
    }
    }) 
});


var server = app.listen(8088, function () {

    var host = server.address().address
    var port = server.address().port
 
    console.log("Example app listening at http://%s:%s", host, port)
 })




