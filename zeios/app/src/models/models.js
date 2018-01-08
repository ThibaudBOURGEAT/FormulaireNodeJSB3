const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User
const user_schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        index: {
            unique: true,
        }
    },
    firstname: {
        type: String,
        required: true,
        index: {
            unique: true,
        }
    },
    birthdate: {
        type: String,
        required: true,
        index: {
            unique: true,
        }
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
});

// Group
const group_schema = new mongoose.Schema({
    wording: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
        minlength: 2,
        maxlength: 40,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        maxlength: [30, "Description can't be more than 30 characters"]
    },
})
