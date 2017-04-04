var mongoose = require('mongoose');

var model = mongoose.model('Credentials',mongoose.Schema({
    username: String,
    password: String,
    role: String
}));

module.exports=model;