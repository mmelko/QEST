'use strict';

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('qestMenu')
        .controller('NavigationController', ['dataProvider', 'authService', '$location', '$localStorage', function (dataProvider, authService, $location, $localStorage) {
                var self = this;
                dataProvider.getMenu().success(function (resp) {
                    self.navigationItems = resp;
                });
                
                this.username = $localStorage.username;
                this.dataProvider = dataProvider;
                this.logout = function () {
                    authService.logout();
                    $location.path('/login');
                };
            }
        ])
        .component('qestMenu', {
            templateUrl: 'components/qest-menu/qest-menu.template.html',
            controller: 'NavigationController'
        }
        );

