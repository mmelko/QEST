angular.module('statuses')
        .component('statuses', {
            templateUrl: function($element, $attrs) {
                var templates = {
                    'admin' :'components/statuses/statuses.template.html',
                    'user':'components/statuses/statuses-user.template.html',
                    'null': 'components/statuses/statuses-user.template.html'
                }
                if($attrs.template){
                    console.log("using "+$attrs.template +"template");
                    return templates[$attrs.template];
                }
                else return templates['user'];
           
                
            },
            controller: ['$filter', 'dataProvider', (function StatusesController($filter, dataProvider) {
                    var self = this;
                    this.view = "person";
                    this.query;
                    this.temp;
                    this.currentEmpId = dataProvider.getLogged();
                    
                    this.starred=0;
                    this.dataProvider = dataProvider;
                    

                    dataProvider.getAssociates().query(function (users) {
                        self.associates = users;
//                       console.log("all users count"+ self.allEmployees.length);
                    });

                    this.chooseWeek = function (weekId) {
                        self.currentStatusWeek = $filter('filter')(this.statusWeeks, {week: weekId}, true)[0];
                    };
                    this.saveChanges = function () {
                      dataProvider.saveStatusValues(self.statuses,dataProvider.viewedQuarter,self.currentEmpId).success(function (res){
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

                    dataProvider.refresh = this.choosePersonView;
                    this.reload = function (quarter) {
                        console.log("reloading");
                        dataProvider.getStatuses().get({'id': self.currentEmpId, 'quarter': dataProvider.viewedQuarter}, function (res) {
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