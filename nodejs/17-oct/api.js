var express = require('express');
const User = require('./userSchema');
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

//$inc 
app.put('/order/:id', function(req, res) {
    let id = req.params.id;
    let order = req.query.order;
    async.series([
        function(callback) {
            User.find({ '_id': id }, function(err, docs) {
                console.log(docs);
                if (docs.length !== 0) {
                    callback();
                } else {
                    callback('Product Not Found');
                }
            })
        },
        function(callback) {
            User.update({ '_id': id }, { $inc: { quantity: -order, order: order } }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "Order Sucessfully")
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

//$max
app.put('/quantity/:id', function(req, res) {
    let id = req.params.id;
    let quantity = req.query.quantity;
    async.series([
        function(callback) {
            User.find({ '_id': id }, function(err, docs) {
                console.log(docs);
                if (docs.length !== 0) {
                    callback();
                } else {
                    callback('Product Not Found');
                }
            })
        },
        function(callback) {
            User.update({ '_id': id }, { $max: { quantity: quantity } }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "Dataupdated Sucessfully")
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

//$min
app.put('/quantity/:id', function(req, res) {
    let id = req.params.id;
    let quantity = req.query.quantity;
    async.series([
        function(callback) {
            User.find({ '_id': id }, function(err, docs) {
                console.log(docs);
                if (docs.length !== 0) {
                    callback();
                } else {
                    callback('Product Not Found');
                }
            })
        },
        function(callback) {
            User.update({ '_id': id }, { $min: { quantity: quantity } }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "Dataupdated Sucessfully")
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

//$mul
app.put('/price/:id', function(req, res) {
    let id = req.params.id;

    async.series([
        function(callback) {
            User.find({ '_id': id }, function(err, docs) {
                console.log(docs);
                if (docs.length !== 0) {
                    callback();
                } else {
                    callback('Product Not Found');
                }
            })
        },
        function(callback) {
            User.update({ '_id': id }, { $mul: { price: NumberDecimal("10.99") } }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "Order Sucessfully")
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


//$rename
app.put('/rename/:id', function(req, res) {
    let id = req.params.id;
    let data = req.query.rename;
    async.series([
        function(callback) {
            User.find({ '_id': id }, function(err, docs) {
                console.log(docs);
                if (docs.length !== 0) {
                    callback();
                } else {
                    callback('Product Not Found');
                }
            })
        },
        function(callback) {
            User.update({ '_id': id }, { $rename: { "description": data } }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "DataRename Sucessfully")
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


var server = app.listen(8000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});