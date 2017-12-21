var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: Number,
    firstname: String,
    lastname: String,
    birthdate: String,
    login: String,
    email: String,
    password: String,
    billing_address: Number,
    delibery_address: Number
});

module.exports = mongoose.model('User', userSchema);
