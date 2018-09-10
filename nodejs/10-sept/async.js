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
            return callback(new Error('User not found'));
           }
        else{
            res.send(user);
        }
}
    ],function(error){
       if(error){
        res.send("User not Found");
      }
    }) 
});

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
            return callback(new Error('User is already added'));
           }
        else{
            users.push(newUser);
            res.send(users);
        }
}
    ],function(error){
       if(error){
        res.send("User is already Present");
      }
    }) 
});

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
            return callback(new Error('User is already added'));
           }
        else{
            users.push(newUser);
            res.send(users);
        }
}
    ],function(error){
       if(error){
        res.send("User is already Present");
      }
    }) 
});



var server = app.listen(8088, function () {

    var host = server.address().address
    var port = server.address().port
 
    console.log("Example app listening at http://%s:%s", host, port)
 })




