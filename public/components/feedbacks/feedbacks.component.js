angular.module('feedbacks').
        controller('FeedbackCtrl', ['dataProvider', function (dataProvider) {
                var self = this;
                this.message = "";
                this.edit = false;
                this.current;

                this.labels = ["How would you rate the quality and timeliness of his/her tasks?", "How would you rate the level of his/her technical knowledge?",
                    "How would you rate the level of his/her engagement in discussions,planning, problem solving?", "Is he/she interested in solving problems beyond the scope of his/her duties?",
                    "If there was something you didn't like in the previous performance review, did he/she improve that area?", "Is there something you want him/her to improve?", "Other + / - "];
                var criteria = [];
                this.comparedFeedback;
                this.compareWith = dataProvider.getLogged();
                this.ladder = [];
                this.ladderCategory = -1;
                this.associates = [];
                this.statuses;
                this.dataProvider = dataProvider;

                this.initFeedback = function () {
                    var criteria = []
                    for (var i = 0; i < 7; i++) {
                        criteria.push({
                            id: i,
                            comment: "No Feedback",
                            value: 0})
                    }
                    return criteria;
                };

                this.findUser = function (id) {
                    var res;
                    self.associates.forEach(function (user) {
                        if (user.id === id) {
                            res = user;
                            return res;
                        }
                    });
                    return res;
                };


                this.feedback = {
                    user: dataProvider.getLogged(),
                quarter: dataProvider.getCurrentQuarter(),
                    final: false,
                    criteria: this.initFeedback()
                };


                dataProvider.getAssociates().query(function (response) {
                    self.associates = response;
                    self.current = response[0];
                });
                this.initLadder = function () {
                    return dataProvider.getFeedbackLadder(dataProvider.viewedQuarter, self.ladderCategory).success(function (res) {
                        self.ladder = res;
                    });
                };
                this.addFeedback = function () {
                    dataProvider.addFeedback({feedback: self.feedback}).success(function (resp) {
                        self.edit = false;
                        self.initLadder();
                    });
                };
                
              
                this.getExportLink = function () {return dataProvider.getDownloadLink(self.feedback.quarter)};

                this.pick = function (user) {
                    if (!user)
                        user = self.feedback.user;

                    self.feedback.user = user;
                    self.current = self.findUser(user);
                    dataProvider.getFeedback(this.feedback.user, this.feedback.quarter).success(function (resp) {
                        if (resp.length > 0) {
                            self.feedback = resp[0];

                        } else {
                            self.feedback.criteria = self.initFeedback();
                        }

                        dataProvider.getStatuses().get({'id': user, 'quarter': self.feedback.quarter}, function (res) {
                            self.statuses = res;
                            var sum = 0;
                            angular.forEach(self.statuses.weeks, function(week){
                                angular.forEach(week.goals,function (goal) {
                                  sum += goal.value;  
                                });                                
                            });
                            console.log("Total "+sum);
                            self.feedback.criteria[6].value = Math.round((sum/3.0)*10)/10;
                            console.log(self.statuses);
                        });
                    });

                    self.initLadder();
                };

                this.compare = function (compare) {
                    self.compareWith = compare;
                    dataProvider.getFeedback(self.compareWith, dataProvider.viewedQuarter).success(function (resp) {
                        if (resp.length > 0) {
                            self.comparedFeedback = resp[0];

                        } else {
                            self.comparedFeedback = {
                                user: self.compareWith,
                                quarter: self.feedback.quarter,
                                final: false,
                                criteria: self.initFeedback()
                            };
                        }
                    });
                };
                this.initLadder();
                this.changeRank = function (index) {
                    self.ladderCategory = index;
                    self.initLadder();
                };
                dataProvider.refresh = function() {
                     self.initLadder();
                    self.compare(self.comparedFeedback.user);
                    
                };
                this.pick(dataProvider.getLogged());
            }
        ])
        .component('feedbacks', {
            templateUrl: 'components/feedbacks/feedbacks.template.html',
            controller: 'FeedbackCtrl'
        });

        
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


