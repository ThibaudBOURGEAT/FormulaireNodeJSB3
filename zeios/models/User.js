const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User
const user_schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    birthdate: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9]{3,12}$/, 'only between 3 and 12 digits or letters !!!!!'],
        index: {
            unique: true,
        }
    },
    password: {
        type: String,
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    }
    address : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
});

user_schema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(config.salt_iter, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});


module.exports = mongoose.model('User', user_schema);
