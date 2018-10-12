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


app.post('/adduser', function(req, res) {
    let user = new User();
    let date = new Date();
    let timezone = new Date("2016-05-18T16:00:00Z");

    console.log(timezone);
    user.description = req.body.description;
    user.size = req.body.size;
    user.price = req.body.price;
    user.date = date;
    user.save(function(err, docs) {
        if (err) {
            console.log(err);
        }
        res.send("User Added");
    })
})

//async.waterfall model
app.put('/user/:id', function(res, req) {
    console.log();
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
            User.update({ '_id': id }, { $set: { price: "0.00" } }, function(err, docs) {
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

//async.parallel model
var stack = {};
stack.getUsername = function(callback) {
    var name = "ABC";
    callback(null, name)
}

stack.getAge = function(callback) {
    var age = "22";
    callback(null, age)
}

stack.getGender = function(callback) {
    var gender = "Male";
    callback(null, gender)
}

async.parallel(stack, function(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("async_Parallel result:", result);
})




var server = app.listen(8000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});