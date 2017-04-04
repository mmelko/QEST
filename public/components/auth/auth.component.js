angular.module('auth')
        .controller('AuthCtrl', ['authService','$location', function (authService,$location) {
                var self = this;
                this.username="fill your username";
                this.password="";
                this.login = function () {
                    authService.login(self.username, self.password).success(function (resp) {                      
                        $location.path('/dasboard');
                    });
                };
            }])
        .component('auth', {
            templateUrl: 'components/auth/auth.template.html',
            // templateUrl: 'login.html', 
            controller: 'AuthCtrl'
        });
