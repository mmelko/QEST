var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id: String,
    weeks: [{
            id: Number,
            week: String,
            goals: [new mongoose.Schema({
                    goal: String,
                    value: Number
                },{_id:false})]
        }]
});

module.exports = function(quarterName) {
    return mongoose.model(quarterName,schema,quarterName);
}