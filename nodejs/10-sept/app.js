var express = require('express');
var async = require('./node_modules/asynckit/lib/async');
var app = express();

app.use(express.json());

var users = [{"id":1,"email":"abc@gmail.com","name":"Alex","age":22},
             {"id":2,"email":"xyz@gmail.com","name":"Root","age":22},
             {"id":3,"email":"acx@gmail.com","name":"Cook","age":22},
             {"id":4,"email":"abc@gmail.com","name":"Jimi","age":22}];

var allusers;


//url = http://localhost:8087/allusers
app.get('/allusers', async (req, res,/* next*/) => {

    try {
       res.send(users);
     } catch(err) {
         //next(err);
     }
});

//url = http://localhost:8087/users/1 or http://localhost:8087/users/?email=xyz@gmail.com
app.get('/users/:id?', async (req, res, /* next*/) => {
     var reqparam = parseInt(req.params.id);
     var reqquery = req.query.email ;
     var flag = false;
     var user;

    try {

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

        if(flag === true) {
         res.send(user);
        }
        else{res.send("Data not found");}  

     } catch(err) {
         //next(err);
     }
});


///url = http://localhost:8087/allusers/5 or if id is  Already Present it give error
app.post('/allusers/:id', async (req, res, /* next */) => {
    var flag = false;
    var reqparam = parseInt(req.params.id);
    const newUser = {
        id : reqparam,
        name : req.body.name,
        age:req.body.age,
        email:req.body.email
      }
  

    try {
        users.forEach(function (obj) {
            console.log(typeof obj.id);
            if(obj.id === reqparam){
               flag = true;
            }
         });

         if(flag === false)
         {
            users.push(newUser);
            res.send(users);
         }
         else{res.send("Data is Already Present");}


     } catch(err) {
        // next(err);
     }
});


//url = http://localhost:8087/user/1 or if id not found it give error
app.put('/user/:id', async (req, res, /* next */) => {
     var flag = false;
     var id = parseInt(req.params.id);


    try {
       users.forEach(function (obj) {

       if(obj.id === id){
        obj.email=req.body.email;
        obj.name= req.body.name;
        obj.age=req.body.age;
        flag = true;
        res.send(users);

       }
    });
     if(flag === false)
     {
        res.send("Data is not Present");
     }

     } catch(err) {
       //  next(err);
     }
});


//url = http://localhost:8087/user/1 or if id not found it give error
app.delete('/user/:id', async (req, res, /* next */) => {
    var flag = false;
    var id = parseInt(req.params.id);

    try {

        users.forEach(function (obj) {

            if(obj.id === id){
            var index = users.indexOf(obj);
            users.splice(index, 1);
            flag = true;
            res.send(users);
            }

         });
        if(flag === false)
        {
            res.send("Data is not Present"); 
        }

     } catch(err) {
         //next(err);
     }
});



var server = app.listen(8087, function () {

    var host = server.address().address
    var port = server.address().port
 
    console.log("Example app listening at http://%s:%s", host, port)
 })




