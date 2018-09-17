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


//This is giving single user
//url =  http://localhost:8090/allusers/1 or http://localhost:8090/allusers/aoot@gmail.com
app.get('/allusers/:id', function(req, res) {
    let id = req.params.id;
    console.log(id);
    console.log(typeof id);

    async.series([
        //This function checking id/email is present or not
        function(callback) {
            User.find({
                    $or: [
                        { 'email': id },
                        { 'id': id }
                    ]
                },
                function(err, docs) {
                    console.log(docs);
                    if (docs.length === 0) {
                        callback('No Data Found');
                    } else {
                        callback(null, docs)
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