var mongoose = require('mongoose');

var model = mongoose.model('Associates',mongoose.Schema({
    id:String,
    name: String,
    lastName: String,
    img: String,
    admin: String
}));

module.exports=model;