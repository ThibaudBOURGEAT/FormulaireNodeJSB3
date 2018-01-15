const mongoose = require('mongoose');

const address_schema = new mongoose.Schema({
    streetname: {
        type: String,
        required: true,
    },
    numstreet: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    codepostal: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }]
});


module.exports = mongoose.model('Address', address_schema);
