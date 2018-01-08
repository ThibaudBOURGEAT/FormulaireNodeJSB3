var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
    id: Number,
    streetname: String,
    numstreet: Number,
    city: String,
    codepostal: Number
});

module.exports = mongoose.model('Address', addressSchema);
