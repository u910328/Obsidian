(function () {
    'use strict';

    angular.module('obsidian.components')
        .run(/*@ngInject*/ function ($rootScope, $http, $state, $mdSidenav, $q, Auth, $firebase, snippet, config) {

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


            Auth.$onAuth(function (user) { //app.js也有同樣的用法
                $rootScope.user = user;
                $rootScope.loggedIn = !!user;

                if (user) {
                    $firebase.params = {
                        '$uid': user.uid
                    };
                    $rootScope.loggedIn = !!user;

                    var loadList = {
                        profileImageURL: {
                            refUrl: 'users/' + user.uid + '/profileImageURL'
                        },
                        email: {
                            refUrl: 'users/' + user.uid + '/email'
                        },
                        phone: {
                            refUrl: 'users/' + user.uid + '/phone'
                        }
                    };

                    $firebase.load(loadList).then(function (res) {
                        user.profileImageURL = res.profileImageURL;
                        user.email = res.email;
                        user.phone = res.phone;
                        $rootScope.user = user;
                        console.log($rootScope.user);
                    });
                    //Notification
                    //_ref=$firebase.ref('users/'+user.uid+'/notification').orderByChild('unread').equalTo(true).limitToLast(10);
                    //$rootScope.notification=$firebaseArray(_ref);
                    //
                    //$rootScope.$watch('notification',function(obj){
                    //    var newNoti=$rootScope.notification.$getRecord(obj.key)||{};
                    //    var orderStatus='your order('+obj.key+') is '+newNoti.orderStatus;
                    //    ngNotify(orderStatus);
                    //});
                } else {
                    console.log('no user', user);
                    $firebase.params = {};
                }
            });
        });

})();
