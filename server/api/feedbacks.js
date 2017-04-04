var Feedback = require('../models/feedback');
var sum = function (array) {
            res = 0;
            array.forEach(function (f) {
                res += f.value;
            });
            return res;
        };

module.exports = {
    addFeedback: function (req, resp) {
        var feedback = new Feedback();
        var tmp = req.body.feedback;
        feedback.id = tmp.user + "_" + tmp.quarter;
        feedback.user = tmp.user;
        feedback.quarter = tmp.quarter;
        feedback.final = tmp.final;
        feedback.criteria = tmp.criteria;

        Feedback.findOne({id: feedback.id}, function (err, res) {

            if (res) {
                res.criteria = feedback.criteria;
                res.save(function (err) {
                    if (err)
                        throw err;
                    resp.status(200).json({
                        success: true,
                        message: "Feddback updated"
                    });
                });
            } else {
                feedback.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    resp.status(200).json({
                        success: true,
                        message: "feedback added"
                    });
                });
            }
        });
    },
    getFeedbacks: function (req, resp) {
        Feedback.find(function (err, res) {
            if (err) {
                console.log(err);
            }
            resp.json(res);
        });
    },
    getAssociateFeedbacks: function (req, resp) {
        var data = {user: req.params.uid};
        if ((req.params.quarter) && (req.params.uid))
            data = {user: req.params.uid,
                quarter: req.params.quarter};

        Feedback.find(data, function (err, res) {
            if (err) {
                console.log(err);
            }
            resp.json(res);
        });
    },
    getQuarterFeedbacks: function (req, resp) {
        var self = this;
        
        Feedback.find({quarter: req.params.quarter}, function (err, res) {
            if (err) {
                console.log(err);
            }
            var temp = [];
            if (req.params.sum) {
                res.forEach(function (f) {
                    temp.push({
                        id: f.user,
                        value: f.criteria[req.params.sum].value
                    });
                });
            } else {
                res.forEach(function (f) {
                    temp.push({
                        id: f.user,
                        value: sum(f.criteria)
                    });
                });
            }
            resp.json(temp);
        }
        );
    },
    exportFeedbacks: function (req, resp) {
        var labels = ["How would you rate the quality and timeliness of his/her tasks?", "How would you rate the level of his/her technical knowledge?",
            "How would you rate the level of his/her engagement in discussions,planning, problem solving?", "Is he/she interested in solving problems beyond the scope of his/her duties?",
            "If there was something you didn't like in the previous performance review, did he/she improve that area?", "Is there something you want him/her to improve?", "Other + / - "];

        Feedback.find({quarter: req.params.quarter}, function (err, res) {
            var exported = "QUARTER: " + req.params.quarter + "\n";

            res.forEach(function (f) {
                exported += f.user +" "+sum(f.criteria) +" \n ========================= \n";
               // console.log(exported);
                f.criteria.forEach(function (fb, i) {
                    exported += labels[i] + ": " + fb.value + "\n comment: " + fb.comment + "\n\n";
                });

            });
            
            resp.append('Content-Disposition', 'attachment; filename='+req.params.quarter+'.txt').append('Content-type', 'text/csv');
            resp.status(200).send(exported);
        });
        
    }
};