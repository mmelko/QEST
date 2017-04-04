'use strict';
angular.module('dataProvider', ['ngResource']);
angular.module('dataProvider')
        .factory('dataProvider', function ($resource, $http, $filter, $q,$localStorage) {
            this.allUsers = [];
            this.quarterlyData = [];
            self = this;
            this.dataPath="data";
            this.dataApi="http://localhost:5555/api/"

       return {
           
                getMenu: function(){
                  return $http.get(self.dataApi+'menu');  
                },
                getQuarterlyData: function () {
                    return  $http.get(self.dataApi+'statuses/FY17Q3').success(function (response) {
                        self.quarterlyData = response.data;
                    });
                },
                getAssociates: function () {
                    return $resource(self.dataApi+"associates");
                },
                getAssociateById: function () {
                    return $resource(self.dataApi+"associates/:id");
                },               
                getTasks: function () {
                    return $resource(self.dataPath+"employees/:empId" + "/statuses/q3/" + ":weekId.json");
                },
                getStatuses: function () {
                    return $resource(self.dataApi+"statuses/:quarter/:id");
                },
                saveStatusValues: function(statuses,quarter,id){
                    return $http.post(self.dataApi+"statuses/"+quarter+"/"+id, {weeks:statuses});
                },
                
                //feedbacks
                addFeedback: function(data) {
                    return $http.post(self.dataApi+"feedbacks/",data);
                },
                getFeedback: function(user,quarter){
                    return $http.get(self.dataApi+"feedbacks/"+user+"/"+quarter);
                    
                },
                getFeedbackLadder: function(quarter,cat){
                    if(cat!= -1)
                        return $http.get(self.dataApi+"feedbacksq/"+quarter+"/"+cat);
                    else
                        return $http.get(self.dataApi+"feedbacksq/"+quarter);                  
                },
                getLogged: function () {
                    return $localStorage.username;
                }

            };
        });
 

