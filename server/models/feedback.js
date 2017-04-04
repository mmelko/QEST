var mongoose = require('mongoose');

var model = mongoose.model('Feedbacks',mongoose.Schema({
    id: String,
    user: String,
    quarter: String,
    final: Boolean,
    criteria: [
        {
            id: Number,
            comment: String,
            value: Number
        }
    ] 
}));


module.exports=model;