var express = require('express');
var async = require('./node_modules/asynckit/lib/async');
var app = express();
var users = [{"id":1,"email":"abc@gmail.com","name":"Alex","age":22},
             {"id":2,"email":"xyz@gmail.com","name":"Root","age":22},
             {"id":3,"email":"acx@gmail.com","name":"Cook","age":22},
             {"id":4,"email":"abc@gmail.com","name":"Jimi","age":22}];

var allusers;

app.use(function (err, req, res, next) {
    console.error()
    res.send("Data already ")
  })

app.get('/allusers', async (req, res,next) => {

    try {
       res.send(users);

     } catch(err) {
         next(err);
     }
});

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



app.post('/', async (req, res, /* next */) => {
    try {
       console.log("hii");
     } catch(err) {
         next(err);
     }
});



app.put('/', async (req, res, /* next */) => {
    try {
       console.log("hii");
     } catch(err) {
         next(err);
     }
});


app.delete('/', async (req, res, /* next */) => {
    try {
       console.log("hii");
     } catch(err) {
         next(err);
     }
});



var server = app.listen(8087, function () {

    var host = server.address().address
    var port = server.address().port
 
    console.log("Example app listening at http://%s:%s", host, port)
 })




