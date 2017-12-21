var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typeAddressSchema = new Schema({
    id: Number,
    address_id: Number,
    type: String
});

module.exports = mongoose.model('TypeAddress', typeAddressSchema);
