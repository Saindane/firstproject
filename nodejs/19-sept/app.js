var express = require('express');
var async = require('async');
const Country = require('./schema');
const Brand = require('./brandschema');
const body = require('body-parser');
var app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/country');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })


app.get('/country/:id?', function(req, res) {

    let _id = req.params.id;
    let array = [];


    async.series([

        function(callback) {

            Country.find({}, function(err, docs) {

                if (req.query.countryCode === 'true') {

                    if (docs.length !== 0) {

                        for (let docslength = 0; docslength < docs.length; docslength++) {
                            array.push(docs[docslength].country.countryCode);
                        }
                        res.send(array);
                    }
                } else if (req.query.countryName === 'true') {
                    console.log("hii");
                    for (let docslength = 0; docslength < docs.length; docslength++) {
                        array.push(docs[docslength].country.countryName);
                    }
                    res.send(array);
                } else {
                    callback();
                }
            })
        },
        function(callback) {
            Country.find({ "_id": _id }, function(err, docs) {
                if (docs.length !== 0) {
                    callback(null, docs);
                } else {
                    callback("Error");
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





//url = http://localhost:8090/addcountry
/*
app.post('/addcountry', function(req, res) {

    let allcountry = req.body.country
    async.series([
        function(callback) {

            for (var countrys in allcountry) {

                let country = new Country(allcountry[countrys]);

                country.save(function(err) {
                    if (err) {
                        console.log(err);
                        callback(country);
                    }
                })
            }
        }
    ], function(error, data) {
        if (error) {
            res.send(error);

        } else {
            res.send(data);
        }
    })
})*/

app.post('/addcountry', function(req, res) {

    let allcountry = req.body
    let count = 0;
    async.series([
        function(callback) {

            for (var countrys in allcountry) {

                let country = new Country(allcountry[countrys]);

                country.save(function(err) {
                    if (err) {
                        console.log(err);
                        callback(country);
                    }
                })
            }
        }
    ], function(error, data) {
        if (error) {
            res.send(error);

        } else {
            res.send(data);
        }
    })
})





app.put('/update', function(req, res) {

})


app.post('/brand/', function(req, res) {
    flag = false;

    let code = req.body.countryCode;

    let brand = new Brand();
    brand.brandname = req.body.brandname;


    async.series([
            //This function checking id is present or not
            function(callback) {
                Country.find({}, function(err, docs) {
                    console.log(docs);
                    if (docs.length > 0) {
                        flag = true;
                    }
                    if (flag === false) {
                        callback('countryCode isnot exist');
                    } else {
                        brand.countryCode = docs[0]._id;
                        callback()
                    }
                })
            },
            //This function is storing userinformation in infoSchema 
            function(callback) {
                brand.save(function(err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        callback("Data Save");
                    }
                })
            }
        ],
        function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        })
})



/*
app.get('/country/:id?', function(req, res) {

    let _id = req.params.id;
    let array = [];


    async.series([

        function(callback) {

            if (req.query.countryCode === 'true') {

                Country.find({}, function(err, docs) {
                    if (docs.length !== 0) {
                        for (let docslength = 0; docslength < docs.length; docslength++) {
                            array.push(docs[docslength].countryCode);
                        }
                        res.send(array);
                    }
                })

            } else if (req.query.countryName === 'true') {

                Country.find({}, function(err, docs) {
                    for (let docslength = 0; docslength < docs.length; docslength++) {
                        array.push(docs[docslength].countryName);
                    }
                    res.send(array);
                })
            } else {
                callback();
            }
        },

        function(callback) {
            Country.find({ "_id": _id }, function(err, docs) {
                if (docs.length !== 0) {
                    callback(null, docs);
                } else {
                    callback("Error");
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
*/








var server = app.listen(8090, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})