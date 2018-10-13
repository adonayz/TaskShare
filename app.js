var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
var connectMongo = require('connect-mongo')(session);
var bodyParser = require('body-parser');
//mongoose.connect(process.env.PROD_MONGODB);
//mongoose.connect('mongodb://localhost/appstorage');
//mongoose.connect("mongodb://taskshare:taskshare123@ds237855.mlab.com:37855/taskshare");
var uristring =
    process.env.PROD_MONGODB ||
    'mongodb://localhost/appstorage';

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('Cant connect: ' + uristring + '. ' + err);
    } else {
        console.log ('Connected to: ' + uristring);
    }
});

var database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function () {
    console.log("Mongoose connection successful!!")
});

var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');

app.use(session({
    store: new connectMongo({
        mongooseConnection: database
    }),
    secret: 'adonayz-webware-final',
    saveUninitialized: false,
    resave: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// setup logger and parse
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', homeRouter);
app.use('/', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
