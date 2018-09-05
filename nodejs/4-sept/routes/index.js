var express = require('express');
var Request = require('request');
var fs = require('fs');
var router = express.Router();

var userid,comment,title;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET all users and store in  textFile. */
router.get('/users', function(req, res, next) {
  //This is fetching the from url
  Request.get("https://jsonplaceholder.typicode.com/posts", (error, response, data) => {


    if(error) {
        return console.log(error);
    }

     //url fetch data store into file
    fs.writeFile('json.txt', "Json ="+data ,  function(err) { if (err) {
           return console.error(err);
        }
    })

});
  res.render('index', { title: 'Data Fetching Done' });
});


/*This is get reuqest to display form */
router.get('/user', function(req, res, next) {
  res.render('form');
});




/* Post Data to Api. */
router.post('/user', function (req, res) {
  userid = req.body.userid;
  title  = req.body.title; 
  comment = req.body.comment;

  Request.post({
    "headers": { "content-type": "application/json" },
    "url": "https://jsonplaceholder.typicode.com/posts",
    "body": JSON.stringify({
        "userid": userid,
        "title": title,
        "comment": comment
    })
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
});

  res.render('index', { title: 'Comment Posted Sucessfully'});
})
//---------------------------------------------------------------------------------------


/*This is get reuqest to display form */
router.get('/updateUser', function(req, res, next) {
  res.render('updateUserForm');
});


/*Update Data from the file */
router.put('/update', function (req, res) {
  id = req.body.id;
  title  = req.body.title; 
  comment = req.body.comment;

  fs.readFile('json.txt', function (err, data) {
    if (err) {
       return console.error(err);
    }
    console.log("Asynchronous read: " + data.toString());
 });
 /* const index = Json.indexOf(Json.id);
  console.log(index);*/
 

})





/*This is get reuqest to display form */

router.get('/deleteUser', function(req, res, next) {
  res.render('deleteUserForm');
});

 
/*Update Data from the file */
router.delete('/delete', function (req, res) {
  res.render('deleteUserForm');
  userid = req.body.id;
  console.log("dfgdfgffdg");
  
})













module.exports = router;
