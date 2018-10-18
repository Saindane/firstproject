var express = require('express');
const Product = require('./productSchema');
var async = require('async');
var bodyParser = require('body-parser');


var app = express();
const mongoose = require('mongoose');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/practies');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })

app.post('/addproduct', function(req, res) {
    let product = new Product();
    product.productName = req.body.productName;
    product.price = req.body.price;
    product.gst = req.body.gst;
    product.brand = req.body.brand;
    product.country = req.body.country;
    product.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.send("Product is Added");
        }
    })
});

//$add
app.put('/calculate', function(req, res) {
    Product.aggregate(
        [
            { $project: { _id: 0, productName: 1, total$: { $add: ["$price", "$gst"] } } }
        ],
        function(err, doc) {
            if (err) {
                console.log(err)
            } else {
                res.send(doc);
            }
        })
});


//$arrayElemAt
app.put('/array', function(req, res) {
    Product.aggregate(
        [{
            $project: {
                _id: 0,
                productName: 1,
                first: { $arrayElemAt: ["$brand", 0] },
                last: { $arrayElemAt: ["$brand", -1] }
            }
        }],
        function(err, doc) {
            if (err) {
                console.log(err)
            } else {
                res.send(doc);
            }
        })
});

//$cmp
app.put('/compare', function(req, res) {
    Product.aggregate(
        [{
            $project: {
                _id: 0,
                productName: 1,
                cmpTo20: { $cmp: ["$price", 20] }
            }
        }],
        function(err, doc) {
            if (err) {
                console.log(err)
            } else {
                res.send(doc)
            }
        }
    )

});

//$concat
app.put('/concat', function(req, res) {
    Product.aggregate(
        [
            { $project: { _id: 0, productName: 1, productDescription: { $concat: ["$productName", " - ", "$country"] } } }
        ],
        function(err, doc) {
            if (err) {
                console.log(err)
            } else {
                res.send(doc)
            }
        }
    )

});

//$cond
app.put('/discount', function(req, res) {
    Product.aggregate(
        [{
            $project: {
                _id: 0,
                productName: 1,
                discount: {
                    $cond: { if: { $gt: ["$price", 20] }, then: 2 + '%', else: 0 + '%' }
                }
            }
        }],
        function(err, doc) {
            if (err) {
                console.log(err)
            } else {
                res.send(doc)
            }
        }
    )

});



var server = app.listen(8000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});