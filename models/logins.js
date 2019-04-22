var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
// set up a mongoose model
var Logins = new Schema({
  RollNo: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    }
});
 
Logins.pre('save', function (next) {
    var logins = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(logins.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                logins.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
Logins.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('Logins', Logins);