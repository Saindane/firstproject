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
//url =  http://localhost:8090/allusers
app.get('/allusers', function(req, res) {
    User.find({}, function(err, users) {
        res.send(users);
    });
})

//This is giving single user
//url =  http://localhost:8090/allusers/1
app.get('/allusers/:id', function(req, res) {
    let id = parseInt(req.params.id);
    flag = false;

    async.series([
        //This function checking id is present or not
        function(callback) {
            User.find({ "id": id }, function(err, docs) {
                if (docs.length) {
                    flag = true;
                }
                if (flag === false) {
                    callback('No Data Found');
                } else {
                    callback();
                }
            })
        },
        //This function giving single user
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
            res.send(data[1]);
        }
    })

})


//This is for posting the single data
//url =  http://localhost:8090/adduser/root@gmail.com
app.post('/adduser/:email', function(req, res) {
    let email = req.params.email;
    flag = false;

    let user = new User();
    user.id = req.body.id;
    user.name = req.body.name;
    user.email = email;
    user.age = req.body.age;


    async.series([
        //This function checking email is present or not
        function(callback) {
            User.find({ "email": email }, function(err, docs) {
                if (docs.length) {
                    flag = true;
                }
                if (flag === true) {
                    callback('Data is already exist');
                } else {
                    callback();
                }
            })
        },
        //This function is storing data into database
        function(callback) {
            user.save(function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    User.find({}, function(err, users) {
                        callback(null, users);
                    })
                }
            })
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data[1]);
        }
    })

})

//updating operation is here
//url =  http://localhost:8090/user/1
app.put('/user/:id', function(req, res) {
    flag = false;
    let user = {};
    user.name = req.body.name;
    user.email = req.body.email;
    user.age = req.body.age;
    let id = parseInt(req.params.id);

    async.series([
        //This function checking id is present or not
        function(callback) {
            User.find({ "id": id }, function(err, docs) {
                if (docs.length) {
                    flag = true;
                }
                if (flag === false) {
                    callback('No Data Found to Update');
                } else {
                    callback();
                }
            })
        },
        //This function is for updateing data from database
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
            res.send(data[1]);
        }
    })
})

//Delete operation is here
//url =  http://localhost:8090/user/1
app.delete('/user/:id', function(req, res) {
    flag = false;
    let id = parseInt(req.params.id);

    async.series([
        //This function checking id is present or not
        function(callback) {
            User.find({ "id": id }, function(err, docs) {
                if (docs.length) {
                    flag = true;
                }
                if (flag === false) {
                    callback('No Data Found to Delete');
                } else {
                    callback();
                }
            })
        },
        //This function is for removeing data from database
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
            res.send(data[1]);
        }
    })
})

var server = app.listen(8090, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})