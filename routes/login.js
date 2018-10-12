var express = require('express');
var router = express.Router();
var User = require('../models/user-authentication');
var mongoose = require('mongoose');

function createUser(newEntry, req, res, next) {
    console.log("Trying to create user");
    console.log(JSON.stringify(newEntry));
    User.create(newEntry, function (err, user) {
        if (err){
            console.log(err.toString());
            return next(err);
        }
        console.log("User created");
        req.session.userId = user._id;
        //res.send('Congratulations you have been registered!');
        console.log("Registered!");
        return res.redirect('/home');
    });
}

router.get('/', function (req, res, next) {
    console.log("Go to login page");
    res.render('login');
});

router.post('/register', function (req, res, next) {
    var dataReceived = req.body;
    var newEntry = {
        fullname: dataReceived.fullname,
        username: dataReceived.username,
        password: dataReceived.password,
        email: dataReceived.email,
        phone: dataReceived.phone,
        venmo: dataReceived.venmo
    };
    var error_message;
    var err;
    if (newEntry.password !== req.body.password_confirmation) {
        console.log(newEntry.password + " and " + req.body.password_confirmation);
        error_message = 'Password and confirmation are not the same.';
        err = new Error(error_message);
        //res.send(error_message);
        console.log("Pass error");
        err.status = 400;
        return next(err);
    }
    if (!(newEntry.fullname && newEntry.username && newEntry.password && req.body.password_confirmation
        && newEntry.email && newEntry.phone && newEntry.venmo)) {
        error_message = 'Remember to fill the form.';
        err = new Error(error_message);
        //res.send(error_message);
        console.log("Fill for error");
        err.status = 400;
        return next(err);
    } else {
        return createUser(newEntry, req, res, next);
    }
});
    router.post('/login', function (req, res, next) {
    var dataReceived = req.body;
    var loginData = {
        username: dataReceived.username,
        password: dataReceived.password
    };
    var error_message;
    var err;
    if (loginData.username && loginData.password) {
        User.authenticate(loginData.username, loginData.password, function (error, user) {
            if (!user || error) {
                var err = new Error('Try again');
                err.status = 401;
                //res.send('Try again');
                console.log(error.toString());
                return next(err);
            } else {
                req.session.userId = user._id;
                //res.send('You have been logged in!');
                console.log("Logged in!");
                return res.redirect('/home');
            }
        });
    } else {
        error_message = 'Remember to fill the form.';
        err = new Error(error_message);
        console.log(error_message);
        //res.send(error_message);
        err.status = 400;
        return next(err);
    }
});

router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                console.log("Logged out!");
                return res.redirect('/');
            }
        });
    }
});


module.exports = router;