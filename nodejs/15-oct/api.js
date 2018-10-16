var express = require('express');
const User = require('./userSchema');
var async = require('async');

var app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/practies');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })

//async.waterfall model
app.put('/user/:id', function(res, req) {
    let mobileNo = res.query.mobileNo;
    let alternativeNo = res.query.alternativeNo;
    async.waterfall([
        function(callback) {
            User.find({ '_id': res.params.id }, function(err, docs) {
                if (docs.length > 0) {
                    var id = docs[0]._id;
                    callback(null, id)
                    return;
                }
                callback("NoData found to update")
            })
        },
        function(id, callback) {
            User.update({ '_id': id }, { '$push': { contactNo: { mobileNo: mobileNo, alternativeNo: alternativeNo } } }, function(err, docs) {
                if (err) {
                    console.log(err);
                    return;
                }
                callback(null, "Dataupdated Successfully")
            })
        }
    ], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })

})


//async.waterfall model
app.put('/users/:id', function(res, req) {
    let mobileNo = res.query.mobileNo;
    async.waterfall([
        function(callback) {
            User.find({ '_id': res.params.id }, function(err, docs) {
                if (docs.length > 0) {
                    var id = docs[0]._id;
                    callback(null, id)
                    return;
                }
                callback("NoData found to update")
            })
        },
        function(id, callback) {
            User.update({ '_id': id }, { '$pull': { contactNo: { mobileNo: mobileNo } } }, function(err, docs) {
                if (err) {
                    console.log(err);
                    return;
                }
                callback(null, "Dataupdated Successfully")
            })
        }
    ], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })

})


var server = app.listen(8000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});