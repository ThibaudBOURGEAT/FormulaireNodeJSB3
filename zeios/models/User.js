const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User
const user_schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    firstname: {
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
    billing_address : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type_address',
        required: true,
    },
    delivery_address : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type_address',
        required: true,
    }
});


module.exports = mongoose.model('User', user_schema);
