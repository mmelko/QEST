'use strict';
angular.module('dataProvider', ['ngResource']);
angular.module('dataProvider')
    .factory('dataProvider', function ($resource, $http, $filter, $q, $localStorage) {
        this.allUsers = [];
        this.quarterlyData = [];
        self = this;
        this.dataPath = "data";
        this.dataApi = "/api/";

        //PoC quarters 
        this.quarters = [
            {
                id: "FY16",
                name: "FY 2016"
            },
            {
                id: "FY17Q1",
                name: "FY 2017:Q1"
            },
            {
                id: "FY17Q2",
                name: "FY 2017:Q2"
            },
            {
                id: "FY17Q3",
                name: "FY 22017:Q3"
            },
            {
                id: "FY17Q4",
                name: "FY 2017:Q4"
            },
            {
                id: "FY18Q1",
                name: "FY 2018:Q1"
            },
            {
                id: "FY18Q2",
                name: "FY 2018:Q2"
            },
            {
                id: "FY18Q3",
                name: "FY 2018:Q3"
            },
            {
                id: "FY18Q4",
                name: "FY 2018:Q4"
            }
        ];
        this.quarters.reverse();

        return {
            getMenu: function () {
                return $http.get(self.dataApi + 'menu');
            },
            getQuarterlyData: function () {
                return $http.get(self.dataApi + 'statuses/FY17Q3').success(function (response) {
                    self.quarterlyData = response.data;
                });
            },
            getAssociates: function () {
                return $resource(self.dataApi + "associates");
            },
            getAssociateById: function () {
                return $resource(self.dataApi + "associates/:id");
            },
            getTasks: function () {
                return $resource(self.dataPath + "employees/:empId" + "/statuses/q3/" + ":weekId.json");
            },
            getStatuses: function () {
                return $resource(self.dataApi + "statuses/:quarter/:id");
            },
            saveStatusValues: function (statuses, quarter, id) {
                return $http.post(self.dataApi + "statuses/" + quarter + "/" + id, { weeks: statuses });
            },

            exportQuarter: function (quarter) {
                return $http.get(self.dataApi + "export/" + quarter + "/");
            },
            //feedbacks
            addFeedback: function (data) {
                return $http.post(self.dataApi + "feedbacks/", data);
            },
            getFeedback: function (user, quarter) {
                return $http.get(self.dataApi + "feedbacks/" + user + "/" + quarter);

            },
            getFeedbackLadder: function (quarter, cat) {
                if (cat != -1)
                    return $http.get(self.dataApi + "feedbacksq/" + quarter + "/" + cat);
                else
                    return $http.get(self.dataApi + "feedbacksq/" + quarter);
            },
            getLogged: function () {
                return $localStorage.username;
            },
            getDownloadLink: function (quarter) {
                return self.dataApi + "export/" + quarter + "?token=" + $localStorage.token;
            },
            getQuarters: function () {
                return self.quarters;
            },
            getCurrentQuarter: function () {
                return self.quarters[0].id;
            },

            getRole: function () {
                return $localStorage.role;
            },
            viewedQuarter: self.quarters[0].id,
            refresh: function () {
                // do nothing
            }

        };
    });


