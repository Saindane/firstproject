var express = require('express');
var Request = require('request');
var objects = require('./input.json');
var fs = require('fs');
var app = express();


var data;

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   res.send('Home Page');
})

//It will display all users from api 
app.get('/users', function(req, res, next) {
    //This is fetching the from url
    Request.get("https://jsonplaceholder.typicode.com/posts", (error, response, data) => {
  
  
      if(error) {
          return console.log(error);
      }
  
       //url fetch data store into file
      fs.writeFile('json.txt', data ,  function(err) { if (err) {
             return console.error(err);
          }
      })
      res.send('Data Fetching Successfully');
  });





/* Post Data to Api. */
app.post('/users', function (req, res) {
 
    Request.post({
      "headers": { "content-type": "application/json" },
      "url": "https://jsonplaceholder.typicode.com/posts",
      "body": JSON.stringify({
          "userid": "22",
          "title": "abc",
          "comment": "THis is user Comment"
      })
  }, (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
      console.dir(JSON.parse(body));
  });
  res.send('Data Posted Successfully');
  })
});



//It will update the contain from json file
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
  fs.writeFile('input.json', data ,  function(err) { if (err) {
    return console.error(err);
 }
})
  res.send('Update Data Successfully');

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
fs.writeFile('remain.json', data ,  function(err) { if (err) {
    return console.error(err);
 }
})
   res.send('Update Deleted Successfully');
})




var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port
 
    console.log("Example app listening at http://%s:%s", host, port)
 })
