// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Hartzler-Home");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var User = mongoose.model('User', {
    username: String,
    password: String
});


// Get all requested credentials
app.get('/api/login', function (req, res) {

    console.log("Getting User Authentication...");
    console.log(req)
    //use mongoose to get all groceries in the database
    User.find({
        username: req.body.username,
        password: req.body.password,
    }, function (err, user) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(user); // return all groceries in JSON format
    });
});

app.get('/api/loginAll', function (req, res) {

    console.log("Getting User Authentication...");

    //use mongoose to get all groceries in the database
    User.find(function (err, user) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(user); // return all groceries in JSON format
    });
});


// Create a grocery Item
app.post('/api/createLogin', function (req, res) {

    console.log("Creating new user...");

    User.create({
        username: req.body.username,
        password: req.body.password,
        done: false
    }, function (err, user) {
        if (err) {
            res.send(err);
        }

        // create and return the new user
        User.find({
            username: req.body.username,
            password: req.body.password,
            
        }, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    });

});

// Update a User information
app.put('/api/groceries/:id', function (req, res) {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    console.log("Updating item - ", req.params.id);
    User.update({_id: req.params.id}, user, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a User
app.delete('/api/deleteLogin/:id', function (req, res) {
    User.remove({
        _id: req.params.id
    }, function (err, user) {
        if (err) {
            console.error("Error deleting user ", err);
        }
        else {
            User.find(function (err, user) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(user);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Grocery server listening on port  - ", (process.env.PORT || 8080));