const mongoose = require('mongoose');

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
    description: {
        type: String
    }
})


module.exports = mongoose.model('Group', group_schema);
