const mongoose = require('mongoose');

const type_address_schema = new mongoose.Schema({
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
});


module.exports = mongoose.model('Type_address', type_address_schema);
