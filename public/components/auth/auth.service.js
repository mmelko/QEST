'use strict';
angular.module('auth')
        .factory('authService', function ($http, $q, $httpParamSerializerJQLike,$localStorage) {
            return {
                login: function (username, password) {
                    return $http({
                        method: 'POST',
                        url: 'api/authenticate',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data: $httpParamSerializerJQLike({'username': username,
                            'password': password
                        })
                    }).success(function(resp){
                        $localStorage.token=resp.token;    
                        $localStorage.username=username;
                    });
                },
                logout: function() {
                    delete $localStorage.token;
                }
            }
        });