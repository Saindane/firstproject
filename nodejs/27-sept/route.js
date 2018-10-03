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

app.post('/login', function(req, res) {

    async.series([
        function(callback) {
            User.find({ $and: [{ 'email': req.body.email }, { 'password': req.body.password }] }, function(err, docs) {
                if (docs.length > 0) {
                    callback(null, 'user');

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


app.get('/user', function(req, res) {

    async.series([
        function(callback) {
            User.find({ status: 'activated' }, function(err, docs) {
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


app.get('/user/:email', function(req, res) {

    var emailparam = req.params.email;

    async.series([
        function(callback) {
            User.find({ $and: [{ status: 'activated' }, { email: emailparam }] }, function(err, docs) {
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

    async.series([

        function(callback) {
            User.find({ "email": req.body.email }, function(err, docs) {
                if (docs.length !== 0) {
                    callback('User is  already exist');
                } else {
                    callback()
                }
            })
        },
        function(callback) {
            let user = new User(req.body);
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


app.put('/user/:email', function(req, res) {


    let email = req.params.email;
    console.log(email);
    let address = req.body.address;
    let userName = req.body.userName;
    let password = req.body.password;
    let emailparam = req.body.email;


    async.series([
            function(callback) {
                User.find({ 'email': email },
                    function(err, docs) {
                        if (docs.length > 0) {
                            callback()
                        } else {
                            callback('Data not found to Update');
                        }
                    })
            },
            function(callback) {
                User.update({ 'email': email }, { '$set': { 'userInfo.userName': userName, 'userInfo.address': address, 'password': password, 'email': emailparam } },
                    function(err) {
                        if (err) {
                            callback('EmailId already Present');
                            return;
                        } else {
                            callback(null, "Data Updated Successfully")
                        }
                    })
            }
        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data[1]);
            }
        })
})


app.put('/status/:id', function(req, res) {

    let id = req.params.id;

    async.series([
            function(callback) {
                User.find({ '_id': id },
                    function(err, docs) {
                        if (docs.length > 0) {
                            callback()
                        } else {
                            callback('Data not found to Update');
                        }
                    })
            },
            function(callback) {
                User.update({ '_id': id }, { '$set': { 'status': 'deactivated' } },
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback(null, "Status Updated Successfully")
                        }
                    })
            }
        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data[1]);
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
    //---company routes------

app.get('/companies', function(req, res) {

    async.series([
        function(callback) {
            Company.find({ 'companyInfo.status': 'activated' }, function(err, docs) {
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

    let comapny = new Company(req.body);
    comapny.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.send("company added")
        }
    })
})


app.get('/company/:id', function(req, res) {

    let id = req.params.id;

    async.series([
        function(callback) {
            Company.find({ $and: [{ 'companyInfo.status': 'activated' }, { '_id': id }] }, function(err, docs) {
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


app.put('/companystatus/:id', function(req, res) {

    let id = req.params.id;
    console.log(id);

    async.series([
            function(callback) {
                Company.find({ '_id': id },
                    function(err, docs) {
                        if (docs.length > 0) {
                            callback()
                        } else {
                            callback('Data not found to Update');
                        }
                    })
            },
            function(callback) {
                Company.update({ '_id': id }, { '$set': { 'companyInfo.status': 'deactivated' } },
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback(null, 'CompanyStatus is updated')
                        }
                    })
            }
        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data[1]);
            }
        })
})



app.put('/company/:id', function(req, res) {

    let id = req.params.id;
    console.log(id);
    let registrationno = req.body.registrationno;
    let companyName = req.body.companyName;
    let faxno = req.body.faxno;
    let useremail = req.body.useremail

    async.series([
            function(callback) {
                Company.find({ '_id': id }, function(err, docs) {
                    if (docs.length > 0) {
                        callback()
                    } else {
                        callback('Data not found to Update');
                    }
                })
            },
            function(callback) {
                Company.update({ '_id': id }, { '$set': { 'companyName': companyName, 'companyInfo.registrationNo': registrationno, 'companyInfo.fax': faxno, 'companyInfo.userInfo.userEmail': useremail } },
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            callback(null, "CompanyData Updated Sucessfully")
                        }
                    })
            }
        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data[1]);
            }
        })
})




app.delete('/company/:id', function(req, res) {

    let id = req.params.id;
    console.log(id);
    async.series([
        function(callback) {

            Company.find({ "_id": id }, function(err, docs) {
                if (docs.length !== 0) {
                    callback();
                } else {
                    callback('Company does not exist');
                }
            })
        },
        function(callback) {
            Company.remove({ "_id": id }, function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, 'Company dataDeleted Successfully')
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