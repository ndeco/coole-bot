const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    serverID: {type: String, require: true},
    vctime: {type: Number},
    messages: {type: Number},
    money: {type: Number}
});

const model = mongoose.model('profileModel', profileSchema);

module.exports = model;