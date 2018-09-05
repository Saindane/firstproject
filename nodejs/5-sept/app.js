var express = require('express');
var Request = require('request');
var objects = require('./input.json');
var fs = require('fs');
var app = express();




// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   res.send('Home Page');
})


//It will display all users from input.json file 
app.get('/users', function(req, res, next) {
    //This is fetching the from file input.json
    var data = JSON.stringify(objects)
       // fetch data store into file
      fs.writeFile('output.json', data ,  function(err) { if (err) {
             return console.error(err);
          }
        }) 
      res.send('Data Fetching Successfully');
});




/* Post Data to output.json. */
app.post('/users', function (req, res) {
  var newObject = {
                  "id":5,
                  "name":"Ram",
                  "age":"24"
                }
objects.push(newObject);

  var data = JSON.stringify(objects)

  fs.writeFile('input.json', data ,  function(err) { if (err) {
    return console.error(err);
 }
}) 
res.send('Data Posted Successfully');
});



//It will fetch data from input.json and add updated data into output.json
app.put('/user/:id',function(req,res,next){
      //res.send({type:'PUT'})
      var id = parseInt(req.params.id);

       objects.forEach(function (obj) {
       if(obj.id === id){
         obj.name="xyz";
         obj.age=24;
       }
  });
  var data = JSON.stringify(objects)
  fs.writeFile('output.json', data ,  function(err) { if (err) {
    return console.error(err);
 }
})
  res.send('Data Updated Successfully');

  })
  
  

// This will delete data from input.json and store the data in remain.json
app.delete('/delete/:id', function (req, res) {

    var id = parseInt(req.params.id);
    console.log(id);

    objects.forEach(function (obj) {
    if(obj.id === id){
       var index = objects.indexOf(objects[obj.id]);
       objects.splice(index-1, 1);
    }
});

var data = JSON.stringify(objects)
fs.writeFile('output.json', data ,  function(err) { if (err) {
    return console.error(err);
 }
})
   res.send('Data Deleted Successfully');
})




var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port
 
    console.log("Example app listening at http://%s:%s", host, port)
 })
