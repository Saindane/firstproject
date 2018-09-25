var express = require('express');
var Student = require('./schema');
var async = require('async');
var app = express();
var router = express.Router();

const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/studentSchema');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })

app.use("/studentdata", router);

router.use("/student/:id", function(req, res, next) {
    if (req.params.id == 0) {
        res.send({ "message": "You must pass ID greater than 0" });
    } else next();
});


router.use("/addstudent", function(req, res, next) {
    if (typeof req.body.id === "string") {
        res.send({ "message": "You must insert id in numberformat" });
    } else next();
});


router.get('/', function(req, res) {
    async.series([
        function(callback) {
            Student.find({}, function(err, docs) {
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
});


router.get("/student/:id", function(req, res) {

    let id = req.params.id;
    async.series([
        function(callback) {
            Student.find({ 'id': id }, function(err, docs) {
                if (docs.length > 0) {
                    callback(null, docs)
                } else {
                    callback("DataNot Found")
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
});


router.post("/addstudent", function(req, res) {
    let id = req.body.id;
    let student = new Student();
    student.id = req.body.id;
    student.name = req.body.name;
    student.email = req.body.email;
    student.bloodGroup = req.body.bloodGroup;

    async.series([
        function(callback) {
            Student.find({ 'id': id }, function(err, docs) {
                if (docs.length > 0) {
                    callback("Student exit")
                } else {
                    callback()
                }
            })
        },
        function(callback) {
            student.save(function(error, docs) {
                if (error) {
                    console.log(error);
                } else {
                    callback(null, "Student Added")
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
});

router.put('/student/:id', function(req, res) {

    let id = req.params.id;
    let email = req.body.email;
    let bloodGroup = req.body.bloodGroup;

    async.series([
        function(callback) {
            Student.find({ 'id': id }, function(err, docs) {
                if (docs.length > 0) {
                    callback()
                } else {
                    callback("Student not found")
                }
            })
        },
        function(callback) {
            Student.update({ 'id': id }, { '$set': { 'email': email, 'bloodGroup': bloodGroup } }, function(error, docs) {
                if (error) {
                    console.log(error);
                } else {
                    callback(null, "Student Information is updated")
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
});

router.delete('/student/:id', function(req, res) {

    let id = req.params.id;

    async.series([
        function(callback) {
            Student.find({ 'id': id }, function(err, docs) {
                if (docs.length > 0) {
                    callback()
                } else {
                    callback("Student not found")
                }
            })
        },
        function(callback) {
            Student.remove({ 'id': id }, function(error, docs) {
                if (error) {
                    console.log(error);
                } else {
                    callback(null, "Student Information is deleted")
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
});



app.use("*", function(req, res) {
    res.status(404).send('Your URL is wrong');
});

app.listen(3000, function() {
    console.log("Live at Port 3000");
});