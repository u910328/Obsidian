(function () {
    obsidian.module('core.init', ['firebase'])
        .factory('init', /*@ngInject*/ function (Auth, $q, $http, $firebase, $rootScope) {
            var def = $q.defer();
            //function logInMain(){}
            //function getDbName(){}
            //function getIdentity(){}
            //function logInOthersAnonymously(){}
            ////compile viewLogic
            //get geoip
            $http.jsonp('http://www.telize.com/geoip?callback=JSON_CALLBACK').then(function (response) {
                console.log(response)
            });

            var preLoadList = {
                stripeKey: {
                    refUrl: 'config/payment/stripe/publishable_key'
                }
            };

            $firebase.load(preLoadList)
                .then(function (res) {
                    if (res.stripeKey && Stripe) Stripe.setPublishableKey(res.stripeKey);
                    return res
                })
                .then(function (res) {
                    def.resolve(res);
                });

            return def.promise
        })
        .run(/*@ngInject*/ function ($rootScope, $http, $state, $mdSidenav, $q, Auth, $firebase, model, init, snippet, config) {


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

            //template


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
