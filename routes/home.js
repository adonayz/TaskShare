var express = require('express');
var router = express.Router();
var User = require('../models/user-authentication');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    instructions: {type: String, required: true},
    reward: {type: Number, required: true},
    uid_boss: {type: String, required: true},
    uid_worker: {type: String},
    status: {type: String, required: true},
    posted_time: {type: Date, required: true, default: Date.now()},
    assigned_time: {type: Date},
    completed_time: {type: Date}
}, {collection: 'task-data'});

var messageSchema = new Schema({
    message: {type: String, required: true},
    tid: {type: String, required: true},
    uid_sender: {type: String, required: true},
    uid_receiver: {type: String, required: true},
    time_sent: {type: Date, required: true, default: Date.now()}
}, {collection: 'status-data'});

var Task = mongoose.model('Task', taskSchema);
var Message = mongoose.model('Message', messageSchema);

var aUser = {fullname: 'Adonay',username: '',password: '', password_confirmation:'', email: '',phone: '', venmo: ''};
var aTask = [{
    instructions: "Get me water",
    reward: "$100",
    uid_boss: "qwe",
    uid_worker: "123",
    status: "POSTED",
    posted_time: Date.now()}];
var aMessage = {};

function createTask(aTask){
    var newTask = Task(aTask);
    console.log(JSON.stringify(aTask));
    newTask.save(function (err) {
        if(err)
            console.log(err.toString());
            throw err;
        console.log("Task created")
    });
}

function createUser(aUser, req, res, next){
    var newUser = User(aUser);
    newUser.create(function (err, user) {
        if(err) return next(err);
        console.log("User created");
        req.session.userId = user._id;
        res.redirect('/');
    });
}

function createMessage(aMessage){
    var newMessage = Message(aMessage);
    newMessage.save(function (err) {
        if(err) throw err;
        console.log("Message created")
    });
}

router.post('/submitNewTask', function (req, res, next) {
    console.log("Received new task");
    var newTaskData = req.body;
    var toTaskFormat = {instructions: newTaskData.new_instructions, reward: newTaskData.reward_input, uid_boss: newTaskData.uid, status: "POSTED", posted_time: Date.now()};
    createTask(toTaskFormat);
    res.end();
});


router.get('/get-users', function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) throw err;
            res.render('home', {
                users: users
            });
        });
});

router.get('/update-user', function (req, res, next) {
    var dataReceived = req.body;

    User.findById(dataReceived.id, function (err, user) {
        if (err) throw err;
        user.fullname = dataReceived.fullname;
        user.username = dataReceived.username;
        user.password = dataReceived.password;
        user.email = dataReceived.email;
        user.phone = dataReceived.phone;
        user.venmo = dataReceived.venmo;
        user.reputation = dataReceived.reputation;
        user.save();
    });

    res.redirect('/');
});

/*router.get('/', function (req, res, next) {
    console.log("Go to home page");
    res.render('home', {
        title: "Final Project",
        posts: aTask,
        currentUser: {uid:'asd', fullname: 'Adonay Resom', username: 'adonayresom'}
    });
});*/
/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("Found HOME");
    User.find({}, function (err, users) {
        if (err) throw err;
        var user_dict = {}; // pairs uid to username inorder to avoid repetitive querying for uid username pairings later
        for(var i = 0; i < users.length; i++){
            user_dict[users[i].uid]=users[i].username;
            user_dict[users[i].username]=users[i].fullname;
        }
        sendTasksToClient(req, res, user_dict);
    });

});

function sendTasksToClient(req, res, user_dict){
    var tasksData = [];
    Task.find({admin:true}).where('status').equals('POSTED').exec(function (err, tasks) {
        if (err) throw err;
        for(var i = 0; i<tasks.length;i++){
            tasksData.push({tid: tasks[i]._id, fullname: user_dict[user_dict[tasks[i].uid_boss]], user_name: user_dict[tasks[i].uid_boss], instructions: tasks[i].instructions, reward: tasks[i].reward, post_time: tasks[i].posted_time});
        }
        var userData = {uid: req.session.userId, user_name: user_dict[req.session.userId], fullname: user_dict[user_dict[req.session.userId]]};
        console.log(JSON.stringify(userData));
        res.render('home', {
            title: "Final Project",
            posts: tasksData,
            currentUser: userData
        });
    });
}

module.exports = router;
