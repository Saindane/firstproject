var express = require('express');
var async = require('async');
const Company = require('./schema');
var app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/company');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })


//This function Display all companies which status are activated
//url = http://localhost:8090/allcompanies
app.get('/allcompanies', function(req, res) {
    async.series([
        function(callback) {
            Company.find({ "status": "activated" }, function(err, docs) {
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

//This function Display single company and also check activated status
//url =   http://localhost:8090/allcompanies/Nokia
app.get('/allcompanies/:companyName', function(req, res) {

    let companyName = req.params.companyName;
    let status;

    async.series([
        function(callback) {
            Company.find({ "companyName": companyName }, function(err, docs) {
                if (docs.length !== 0) {
                    status = docs[0].status;
                    if (status === 'activated') {
                        callback(null, docs);
                    } else {
                        callback("No active company found")
                    }

                } else {
                    callback("Company Not found");
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


//This function Display single company and also check activated status
//url =   http://localhost:8090/companies/Nokia?state=Maharashtra
app.get('/companies/:companyName', function(req, res) {

    let companyName = req.params.companyName;
    let state = req.query.state;

    async.series([
        function(callback) {
            Company.find({ $and: [{ "companyName": companyName }, { "state": state }] }, function(err, docs) {
                if (docs.length !== 0) {
                    status = docs[0].status;
                    if (status === 'activated') {
                        callback(null, docs);
                    } else {
                        callback("No active company found")
                    }

                } else {
                    callback("Company Not found");
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


//This function adding new company and also check activated status
//url = http://localhost:8090/addcompany
app.post('/addcompany', function(req, res) {

    let companyName = req.body.companyName;
    let status = req.body.status;

    let company = new Company();
    company.companyName = req.body.companyName;
    company.address = req.body.address;
    company.country = req.body.country;
    company.state = req.body.state;
    company.city = req.body.city;
    company.status = req.body.status;


    async.series([
        function(callback) {
            Company.find({ "companyName": companyName }, function(err, docs) {
                if (docs.length !== 0) {
                    callback('company already exist');
                } else if (status === "activated") {
                    callback()
                } else {
                    callback('Company status isnot activated')
                }
            })
        },
        function(callback) {
            company.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "New Company is added");
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



//This function updating data with companyName
//url = http://localhost:8090/update/MI
app.put('/update/:companyName', function(req, res) {

    let companyName = req.params.companyName;

    let company = {};
    company.address = req.body.address;
    company.country = req.body.country;
    company.state = req.body.state;
    company.city = req.body.city;
    company.status = req.body.status;



    async.series([
        function(callback) {

            Company.find({ $and: [{ "companyName": companyName }, { "status": "activated" }] }, function(err, docs) {
                if (docs.length !== 0) {
                    callback();
                } else {
                    callback('company does not exist');
                }
            })
        },
        function(callback) {
            Company.update({ "companyName": companyName }, company, function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, 'DataUpdated Successfully')
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

//This function updating data with companyName
//url =http://localhost:8090/update?state=Maharashtra
app.put('/update', function(req, res) {

    var state = req.query.state;
    var id;

    let company = {};
    company.address = req.body.address;
    company.country = req.body.country;
    company.state = state;
    company.city = req.body.city;
    company.status = "activated";

    async.series([
        function(callback) {

            Company.find({ $and: [{ "state": state }, { "status": 'deactivated' }] }, function(err, docs) {
                console.log(docs);
                if (docs.length !== 0) {
                    id = docs[0]._id;
                    callback();
                } else {
                    callback('company does not exist');
                }
            })
        },
        function(callback) {
            Company.update({ "_id": id }, company, function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, 'update company with new data')
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


//url = http://localhost:8090/company/Nokia
app.delete('/company/:companyName', function(req, res) {

    let companyName = req.params.companyName;
    let company = { status: "deleted" }

    async.series([
        function(callback) {

            Company.find({ $and: [{ "companyName": companyName }, { status: "activated" }] }, function(err, docs) {
                if (docs.length !== 0) {
                    callback();
                } else {
                    callback('company does not exist');
                }
            })
        },
        function(callback) {
            Company.update({ "companyName": companyName }, company, function(err) {
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