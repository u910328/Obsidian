(function() {
    'use strict';

    angular
        .module('obsidian')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $window, $http, $state, $mdSidenav, $q, Auth, $firebase, snippet, config) {
        // add a class to the body if we are on windows
        if($window.navigator.platform.indexOf('Win') !== -1) {
            $rootScope.bodyClasses = ['os-windows'];
        }
        // get client's geoip
        $http.jsonp('http://www.telize.com/geoip?callback=JSON_CALLBACK').then(function (response) {
            console.log(response)
        });

        $rootScope.debug = config.debug;
        if (config.debug) console.log('debug mode');

        $rootScope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        $rootScope.sideNavLogout = function (menuId) {
            Auth.$unauth();
            $mdSidenav(menuId).toggle();
            $state.go('home');
        };

        Auth.$onAuth(function (user) {
            $rootScope.user = user;
            $rootScope.loggedIn = !!user;

            if (user) {
                $firebase.params = {
                    '$uid': user.uid
                };
                $rootScope.loggedIn = !!user;

                var loadList = {
                    info: {
                        refUrl: 'users/' + user.uid + '/info'
                    },
                    createdTime: {
                        refUrl: 'users/' + user.uid + '/createdTime'
                    }
                };

                $firebase.load(loadList).then(function (res) {
                    user.createdTime = res.createdTime;
                    user.info = res.info;
                    $rootScope.user = user;
                    console.log($rootScope.user);
                });
            } else {
                console.log('no user', user);
                $firebase.params = {};
            }
        });
    }
})();
