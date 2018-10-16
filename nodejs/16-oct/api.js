var express = require('express');
const UserLogin = require('./userSchema');
var async = require('async');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
const mongoose = require('mongoose');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/login');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })

app.use(express.static(__dirname + "/view"));

app.use(passport.initialize());


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    UserLogin.findOne({
        _id: id
    }, '-password -salt', function(err, user) {
        done(err, user);
    });
});


app.post('/adduser', function(req, res) {
    let user = new UserLogin();
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function(err) {
        if (err) {
            res.send("Error");
            return;
        }
        res.send("Success");
    })
})

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username, password);

        UserLogin.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                console.log(password);
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

app.post('/login',
    passport.authenticate('local', { failureRedirect: "/login.html" }),
    function(req, res) {
        res.send("Success");
    })


var server = app.listen(8000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});