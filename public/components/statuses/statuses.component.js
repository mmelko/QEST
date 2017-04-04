angular.module('statuses')
        .component('statuses', {
            templateUrl: 'components/statuses/statuses.template.html',
            controller: ['$filter', 'dataProvider', (function StatusesController($filter, dataProvider) {
                    var self = this;
                    this.view = "person";
                    this.query;
                    this.temp;
                    this.currentEmpId = dataProvider.getLogged();
                    this.quarter = 'FY17Q4';
                    this.starred=0;

                    dataProvider.getAssociates().query(function (users) {
                        self.associates = users;
//                       console.log("all users count"+ self.allEmployees.length);
                    });

                    this.chooseWeek = function (weekId) {
                        self.currentStatusWeek = $filter('filter')(this.statusWeeks, {week: weekId}, true)[0];
                    };
                    this.saveChanges = function () {
                      dataProvider.saveStatusValues(self.statuses,self.quarter,self.currentEmpId).success(function (res){
                          console.log('saved');
                      }); 
                    };

                    this.choosePerson = function (personId) {                     
                        self.currentPerson = $filter('filter')(this.currentStatusWeek.people, {id: personId}, true)[0];
                    };

                    this.choosePersonView = function (personId) {
                        self.show=null;
                        if (personId)
                        self.currentEmpId = personId;
                        self.reload();
                    };

                    this.reload = function (quarter) {
                        console.log("reloading");
                        dataProvider.getStatuses().get({'id': self.currentEmpId, 'quarter': self.quarter}, function (res) {
                            self.statuses = res;
                         
                        });
                    },
                    
                    this.getUserDetails = function (personId) {
                        return $filter('filter')(self.associates, {id: personId}, true)[0];
                    };
                    
                    this.hasStarred = function (week) {
                        res=false;
                      week.goals.some(function(fn){
                      //    console.log((fn.value >= self.starred));
                      
                          if (parseFloat(fn.value) >= self.starred){                                                  
                              res=true;
                              return;
                          }
                      });
                      return res;
                    };
                    
                })
            ]
        });