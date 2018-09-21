var express = require('express');
var async = require('async');
const User = require('./userSchema');
const Company = require('./companySchema');

var app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/userschema');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })

app.get('/user', function(req, res) {

    async.series([
        function(callback) {
            User.find({ status: { "$ne": 'deleted' } }, function(err, docs) {
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



app.get('/user/:searchPattern', function(req, res) {

    let searchPattern = req.params.searchPattern;

    async.series([
        function(callback) {
            User.find({ $and: [{ 'userInfo.userName': { $regex: searchPattern } }, { status: { "$ne": 'deleted' } }] }, function(err, docs) {
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

    var re = /^([a-zA-Z0-9_\@])+\@(([a-zA-Z0-9_\@])+\.)+([a-zA-Z0-9]{2,4})+$/

    async.series([

        function(callback) {
            if (re.test(email)) {
                User.find({ "email": email }, function(err, docs) {
                    if (docs.length !== 0) {
                        callback('User is  already exist');
                    } else {
                        callback()
                    }
                })
            } else {
                res.send("email isnot valid")
            }
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
            res.send(data);
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
                User.find({ $and: [{ '_id': id }, { 'email': email }, { status: { "$ne": 'deleted' } }] },
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
                User.update({ '_id': id }, { '$set': { 'userInfo.userName': userName, 'userInfo.address': address } },
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback(null, 'update user with new data')
                        }
                    })
            },
        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        })
})



app.put('/users/:email', function(req, res) {

    let emailparams = req.params.email;

    let email = req.body.email;
    let userName = req.body.userName;
    let address = req.body.address;



    async.series([
            function(callback) {
                User.find({ $and: [{ 'email': emailparams }, { 'email': email }, { status: { "$ne": 'deleted' } }] },
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
                User.update({ 'email': emailparams }, { '$set': { 'userInfo.userName': userName, 'userInfo.address': address } },
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback(null, 'update user with new data')
                        }
                    })
            },
        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        })
})


app.put('/userss/:id', function(req, res) {

    let id = req.params.id;
    let status = req.body.status;

    async.series([
            function(callback) {
                User.find({ and: [{ $or: [{ 'email': id }, { '_id': id }] }, { status: { "$ne": 'deleted' } }] },
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
                User.update({ $or: [{ 'email': id }, { '_id': id }] }, { '$set': { 'status': status } },
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback(null, 'status is update')
                        }
                    })
            },
        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        })
})


app.delete('/user/:id', function(req, res) {

    let id = req.params.id;
    async.series([
        function(callback) {

            User.find({ $and: [{ $or: [{ "_id": id }, { "email": id }] }, { status: { "$ne": 'deleted' } }] }, function(err, docs) {
                if (docs.length !== 0) {
                    callback();
                } else {
                    callback('user does not exist');
                }
            })
        },
        function(callback) {
            User.update({ $or: [{ "_id": id }, { "email": id }] }, { '$set': { 'status': 'deleted' } }, function(err) {
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




app.get('/company', function(req, res) {

    async.series([
        function(callback) {
            Company.find({ 'companyInfo.status': 'activated' }, function(err, docs) {
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


app.get('/company/:companyName', function(req, res) {

    let companyName = req.params.companyName;
    async.series([
        function(callback) {
            Company.aggregate([{ $match: { 'companyName': companyName } }], function(err, docs) {
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



app.post('/company', function(req, res) {

    let email = req.body.companyInfo.userInfo.userEmail[0];
    let data = req.body;
    data.companyInfo.status = "activated";

    async.series([
        function(callback) {
            User.find({ "email": email }, function(err, docs) {
                if (docs.length !== 0) {
                    callback()
                } else {
                    callback('User isnot exist');
                }
            })
        },
        function(callback) {
            let company = new Company(data);
            company.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "company is added");
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

app.put('/company/:id', function(req, res) {

    let id = req.params.id;
    let email = req.body.email;

    async.series([
            function(callback) {
                User.find({ 'email': email }, [{ $elemMatch: { 'email': email } }],
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
                Company.update({ '_id': id }, { '$set': { 'companyName': companyName, 'companyInfo.fax': fax } },
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback(null, 'company info is update')
                        }
                    })
            },
        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        })
})


app.delete('/company/:id', function(req, res) {

    let id = req.params.id;

    async.series([
        function(callback) {

            Company.find({ $and: [{ "_id": id }, { 'companyInfo.status': { "$ne": 'deleted' } }] }, function(err, docs) {
                if (docs.length !== 0) {
                    callback();
                } else {
                    callback('Company does not exist');
                }
            })
        },
        function(callback) {
            Company.update({ "_id": id }, { '$set': { 'companyInfo.status': 'deleted' } }, function(err) {
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