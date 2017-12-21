var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userGroupSchema = new Schema({
    id: Number,
    user_id: Number,
    group_id: Number
});

module.exports = mongoose.model('UserGroup', userGroupSchema);
