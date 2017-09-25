var express = require('express');
var statuses = require('./statuses');
var associates = require('./associates');
var auth = require('./auth');
var feedbacks = require('./feedbacks');
var system = require('./system');

module.exports = function (app, jwt) {
    var api = express.Router();

    //auth
    api.route('/').get(function (req, res) {
        res.status(200).json('QE Status Tracker');
    });

    api.route('/authenticate/').post(auth.authenticate(jwt, app.get('superSecret')));
    api.use(auth.verifyToken(jwt, app.get('superSecret')));
    
    //menu
    api.route('/menu')
            .get(system.getMenu);
    /**
     * Get all statuses for quarter
     */
    api.route("/statuses/:quarter/")
            .get(auth.requireAdmin, statuses.getQuarter);
    api.route("/statuses/:quarter/:associate")
            .get(statuses.getAssociateInQuarter)
            .post(auth.requireAdmin,statuses.updateStatusValues);
    //return in week format (week->associate->goal)
    api.route("/associates/")
            .get(associates.getAssociates);
    api.route("/associates/:id")
            .get(associates.getAccordingId);

    //feedbacks 
    //get feedback
    api.route("/feedbacks/")
            .post(auth.requireAdmin,feedbacks.addFeedback)
            .get(auth.requireAdmin,feedbacks.getFeedbacks);
    api.route("/feedbacks/:uid")
            .get(auth.requireAdmin,feedbacks.getAssociateFeedbacks);
    api.route("/feedbacks/:uid/:quarter")
            .get(auth.requireAdmin,feedbacks.getAssociateFeedbacks);
    api.route("/export/:quarter")
            .get(auth.requireAdmin,feedbacks.exportFeedbacks);
    api.route("/feedbacksq/:quarter")
            .get(auth.requireAdmin,feedbacks.getQuarterFeedbacks);
     api.route("/feedbacksq/:quarter/:sum")
            .get(auth.requireAdmin,feedbacks.getQuarterFeedbacks);

    app.use("/api", api);
};







