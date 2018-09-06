var express = require('express');
var Request = require('request');
var objects = require('./input.json');
var fs = require('fs');
var app = express();

app.use(express.json());


// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   res.send('Home Page');
})


//It will display all users from input.json file 
app.get('/users', function(req, res, next) {
    //This is fetching the from file input.json
    
    fs.readFile('input.json', function (err, data) {
      if (err) {
         return console.error(err);
      }
      res.send(data.toString());
    });
});
      //res.send('Data Fetching Successfully');
      




/* Post Data to input.json. */
app.post('/users', function (req, res) {
  /*
  var newObject = {
                  "id":5,
                  "name":"Ram",
                  "age":"24"
                }
objects.push(newObject);*/

const newUser = {
  id : objects.length+1,
  name : req.body.name,
  age:req.body.age
}

objects.push(newUser);

  var data = JSON.stringify(objects)

  fs.writeFile('input.json', data ,  function(err) { if (err) {
    return console.error(err);
 }
}) 
   //res.send('Data Posted Successfully');
   res.send(data);
});



//It will fetch data from input.json and add updated data into input.json
app.put('/user/:id',function(req,res,next){
      
  
      var id = parseInt(req.params.id);

       objects.forEach(function (obj) {
       if(obj.id === id){
         obj.name= req.body.name;
         obj.age=req.body.age;
       }
  });
  var data = JSON.stringify(objects)
  fs.writeFile('input.json', data ,  function(err) { if (err) {
    return console.error(err);
 }
})
  //res.send('Data Updated Successfully');
  res.send(data);

  })
  
  

// This will delete data from input.json 
app.delete('/delete/:id', function (req, res) {

    var id = parseInt(req.params.id);
    console.log(id);

    objects.forEach(function (obj) {
    if(obj.id === id){
       var index = objects.indexOf(obj);
       console.log(index);
       objects.splice(index, 1);
    }
});

var data = JSON.stringify(objects)
fs.writeFile('input.json', data ,  function(err) { if (err) {
    return console.error(err);
 }
})
   //res.send('Data Deleted Successfully');
   res.send(data);
})




var server = app.listen(8082, function () {

    var host = server.address().address
    var port = server.address().port
 
    console.log("Example app listening at http://%s:%s", host, port)
 })
