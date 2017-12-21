var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    id: Number,
    wording: String,
    description: String
});

module.exports = mongoose.model('Group', groupSchema);
