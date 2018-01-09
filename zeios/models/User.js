const mongoose = require('mongoose');
const crypto = require('crypto');

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
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
});

module.exports.hashPassword = function(password) {
    var hash = crypto.createHash('sha256');

    return hash.update(password).digest('base64');
}

module.exports = mongoose.model('User', user_schema);
