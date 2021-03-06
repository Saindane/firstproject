var express = require('express');
var async = require('async');
const Emp = require('./schema');


var app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Employee');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })


app.post('/addemp', function(req, res) {

    let emp = new Emp();
    emp.empName = req.body.empName;
    emp.empAddress = req.body.empAddress;
    emp.country = req.body.country;
    emp.state = req.body.state;
    emp.department = req.body.department;
    emp.status = "activated";

    async.series([
        function(callback) {
            emp.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "Employee is added");
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


app.get('/emp', function(req, res) {

    const pages = parseInt(req.query.pages) || 1;
    const sort = req.query.sort || 'asc';
    const skip = (pages * (10) - 10);

    async.series([
        function(callback) {
            Emp.find({ 'status': 'activated' }, function(err, docs) {
                console.log(docs);
                if (docs.length !== 0) {
                    callback(null, docs);
                } else {
                    callback('Country Not Found');
                }
            }).sort({ empName: sort }).limit(10).skip(skip)
        }
    ], function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })

})

app.get('/empaggregate', function(req, res) {

    const pages = parseInt(req.query.pages) || 1;
    const sort = parseInt(req.query.sort) || 1;
    const skip = (pages * (10) - 10)
    async.series([
        function(callback) {
            Emp.aggregate([{ $match: { 'status': 'activated' } }, { '$sort': { empName: sort } },
                {
                    '$facet': {
                        metadata: [{ $count: "total" }, { $addFields: { page: pages } }],
                        data: [{ $skip: skip }, { $limit: 10 }]
                    }
                }
            ], function(err, docs) {
                console.log(docs);
                if (docs.length !== 0) {
                    callback(null, docs);
                } else {
                    callback('Country Not Found');
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




app.get('/emp/:country', function(req, res) {

    let country = req.params.country;
    async.series([
        function(callback) {
            Emp.aggregate([{ $match: { 'country': country } }, { $match: { 'status': 'activated' } }, { $group: { _id: "$state" } }], function(err, docs) {
                console.log(docs);
                if (docs.length !== 0) {
                    callback(null, docs);
                } else {
                    callback('Country Not Found');
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



app.get('/empdept/:department', function(req, res) {

    let department = req.params.department;
    async.series([
        function(callback) {
            Emp.aggregate([{ $match: { 'department': department } }, { $group: { _id: null, count: { $sum: 1 } } }], function(err, docs) {
                console.log(docs);
                if (docs.length !== 0) {
                    callback(null, "count:" + docs[0].count);
                } else {
                    callback('Department Not Found');
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