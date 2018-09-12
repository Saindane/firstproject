var express = require('express');
var async = require('async');
const User = require('./schema');
var app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/users');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })

//This is for getting all users
//url =  http://localhost:8089/allusers
app.get('/allusers', function(req, res) {
    User.find({}, function(err, users) {
        res.send(users);
    });
})

//This is giving single user
//url =  http://localhost:8089/allusers/alex@gmail.com
app.get('/allusers/:id', function(req, res) {
    let id = parseInt(req.params.id);
    flag = false;

    async.series([
        //This function checking id is present or not
        /*  function(callback) {
              User.findOne({ "id": id }, function(err, u) {
                  console.log(u);
                  console.log(typeof u);
                  if (u == null) {
                      flag = true;
                  }
              })
              if (flag === true) {
                  callback('No data found');
              } else {
                  callback();
              }
          },*/
        function(callback) {
            User.find({ "id": id }, function(err, data) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, data)
                }
            });

        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })

})


//This is giving single user
//url =  http://localhost:8089/allusers/alex@gmail.com
app.post('/adduser/:id', function(req, res) {
    let id = parseInt(req.params.id);
    flag = false;

    let user = new User();
    user.id = id;
    user.name = req.body.name;
    user.email = req.body.email;
    user.age = req.body.age;


    async.series([
        //This function checking id is present or not
        /*  function(callback) {
              User.findOne({ "id": id }, function(err, u) {
                  console.log(u);
                  console.log(typeof u);
                  if (u == null) {
                      flag = true;
                  }
              })
              if (flag === true) {
                  callback('No data found');
              } else {
                  callback();
              }
          },*/
        function(callback) {
            user.save(function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    User.find({}, function(err, users) {
                        console.log(users);
                        callback(null, users);
                    })
                }
            })
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })

})


app.put('/user/:id', function(req, res) {
    flag = false;
    let user = {};
    user.name = req.body.name;
    user.email = req.body.email;
    user.age = req.body.age;
    let id = parseInt(req.params.id);

    async.series([
        //This function checking id is present or not
        /* function(callback) {
             User.findOne({ "id": id }, function(err, u) {
                 console.log(u);
                 console.log(typeof u);
                 if (u == null) {
                     flag = true;
                 }
             })
             if (flag === true) {
                 callback('No data found');
             } else {
                 callback();
             }
         },*/
        function(callback) {

            User.updateOne({ "id": id }, user, function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    User.find({}, function(err, users) {
                        console.log(users);
                        callback(null, users);
                    })
                }
            })
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
})

app.delete('/user/:id', function(req, res) {
    let id = parseInt(req.params.id);

    async.series([
        //This function checking id is present or not
        /* function(callback) {
             User.findOne({ "id": id }, function(err, u) {
                 console.log(u);
                 console.log(typeof u);
                 if (u == null) {
                     flag = true;
                 }
             })
             if (flag === true) {
                 callback('No data found');
             } else {
                 callback();
             }
         },*/
        function(callback) {
            User.remove({ "id": id }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    User.find({}, function(err, users) {
                        console.log(users);
                        callback(null, users);
                    })
                }

            })
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })




})












var server = app.listen(8090, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})