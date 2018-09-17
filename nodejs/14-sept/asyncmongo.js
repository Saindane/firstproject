var express = require('express');
var async = require('async');
const Serial = require('./serialSchema');
const Info = require('./infoSchema');

var app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/data');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })


//This is giving single user
//url =  http://localhost:8090/user/1 or   http://localhost:8090/user/xyz@gmail.com
app.get('/user/:id', function(req, res) {
    let id = req.params.id;
    flag = false;

    async.series([
        //This function checking email is present or not
        function(callback) {
            Info.find({ 'email': id }, function(err, docs) {
                if (docs.length === 0) {
                    flag = true;
                }
                if (flag === true) {
                    callback();
                } else {
                    res.send(docs);
                }
            })
        },
        //This function checking id is present or not
        function(callback) {
            Serial.find({ 'id': id }, function(err, docs) {
                if (docs.length === 0) {
                    callback('No Data Found');
                } else {
                    id = docs[0]._id
                    callback();
                }
            })
        },
        //This function giving singleUser
        function(callback) {
            Info.find({ 'id': id }, function(err, data) {
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
            res.send(data[2]);
        }
    })
})

//This is for posting the single data
//url = http://localhost:8090/adduser/3
app.post('/adduser/:id', function(req, res) {
    let id = req.params.id;
    flag = false;

    let serial = new Serial();
    serial.id = id;


    let user = new Info();
    user.name = req.body.name;
    user.email = req.body.name;
    user.id = serial._id

    async.series([
            //This function checking id is present or not
            function(callback) {
                Serial.find({ "id": id }, function(err, docs) {
                    if (docs.length > 0) {
                        flag = true;
                    }
                    if (flag === true) {
                        callback('Data is already exist');
                    } else {
                        callback()
                    }
                })
            },
            //This function is storing userinformation in infoSchema 
            function(callback) {
                user.save(function(err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        callback();
                    }
                })
            },
            //This function is storing serialnumber in serialSchema 
            function(callback) {
                serial.save(function(err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        callback(null, "Data save");
                    }
                })
            }
        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data[2]);
            }
        })

})



var server = app.listen(8090, function() {

    var host = server.address().address
    var port = server.address().port


    console.log("Example app listening at http://%s:%s", host, port)
})