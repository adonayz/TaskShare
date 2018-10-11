var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    fullname: {type: String, required: true},
    username: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true, trim: true},
    phone: {type: String, required: true},
    venmo: {type: String, required: true},
    reputation: Number
});

// The following authenitication and hashing technique was taken from a tutorial at https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359

userSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
};

userSchema.pre('save', function (next) {
    var user = this;
    var salt = bcrypt.genSaltSync(10);
    bcrypt.hash(user.password, salt, null, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});


var User = mongoose.model('User', userSchema);
module.exports = User;
