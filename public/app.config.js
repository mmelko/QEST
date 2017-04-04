angular.
        module('qest').
        config(['$locationProvider', '$routeProvider', '$httpProvider',
            function config($locationProvider, $routeProvider, $httpProvider) {
                $locationProvider.hashPrefix('!');
                var menuTemplate = " <qest-menu></qest-menu>"
                $routeProvider.
                        when('/login', {
                            template: '<auth></auth>'
                        }).                    
                        when('/statuses', {
                            template: menuTemplate + '<statuses></statuses>'
                        }).
                        when('/bonuses', {
                            template: menuTemplate + '<bonuses></bonuses>'
                        }).            
                        when('/feedbacks', {
                            template: menuTemplate + '<feedbacks></feedbacks>'
                        }).
                        otherwise('/statuses');

                $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {

                        return {
                            'request': function (config) {
                                config.headers = config.headers || {};
                                if ($localStorage.token) {
                                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                                }
                                return config;
                            },
                            'responseError': function (response) {
                                if (response.status === 403) {
                                    delete $localStorage.token;
                                    $location.path('/login');
                                }
                                return $q.reject(response);
                            }
                        };
                    }]);
            }

        ]).
        controller('QestController', ['$localStorage', '$scope', function ($localStorage, $scope) {
                $scope.isLogged = function () {
                    if ($localStorage.token)
                        return true;
                    else
                        return false;
                };

            }]);