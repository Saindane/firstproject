var express = require('express');
var async = require('async');
const User = require('./userSchema');
const Company = require('./companySchema');

var app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/appSchema');
var db = mongoose.connection;

app.use(express.static(__dirname + "/public"));

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })
    /*
    app.post('/login', function(req, res) {

        async.series([
            function(callback) {
                User.find({ $and: [{ 'email': req.body.email }, { 'password': req.body.password }] }, function(err, docs) {
                    if (docs.length > 0) {
                        res.redirect('/user');

                    } else {
                        callback("Username and Password not match")
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
        console.log(req.body);
    })
    */
app.get('/user', function(req, res) {

    async.series([
        function(callback) {
            User.find({ status: 'activated' }, function(err, docs) {
                console.log(docs);
                callback(null, docs);
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


app.post('/user', function(req, res) {


    let email = req.body.email;
    let data = req.body;
    data.status = "activated";

    async.series([

        function(callback) {
            User.find({ "email": email }, function(err, docs) {
                if (docs.length !== 0) {
                    callback('User is  already exist');
                } else {
                    callback()
                }
            })
        },
        function(callback) {
            let user = new User(data);
            user.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "User is added");
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


app.put('/user/:id', function(req, res) {

    let id = req.params.id;

    let email = req.body.email;
    let userName = req.body.userName;
    let address = req.body.address;

    async.series([
            function(callback) {
                User.find({ 'email': email },
                    function(err, docs) {
                        console.log(docs);
                        if (docs.length > 0) {
                            callback()
                        } else {
                            callback('Data not found to Update');
                        }
                    })
            },
            function(callback) {
                User.update({ 'email': email }, { '$set': { 'userInfo.userName': userName, 'userInfo.address': address, 'status': status, 'password': password } },
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback()
                        }
                    })
            },
            function(callback) {
                User.find({ '_id': id },
                    function(err, docs) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback(null, docs)
                        }
                    })
            },

        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data[2]);
            }
        })
})


app.delete('/user/:id', function(req, res) {

    let id = req.params.id;
    async.series([
        function(callback) {

            User.find({ $or: [{ "_id": id }, { "email": id }] }, function(err, docs) {
                if (docs.length !== 0) {
                    callback();
                } else {
                    callback('user does not exist');
                }
            })
        },
        function(callback) {
            User.remove({ $or: [{ "_id": id }, { "email": id }] }, function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, 'DataDeleted Successfully')
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