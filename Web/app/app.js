'use strict';
console.log('app loaded');
console.log(obsidian.getAppDependencies());
// Declare app level module which depends on filters, and services
//angular.module('myApp', obsidian.getAppDependencies())
//
//    .run(function ($rootScope, Auth, init) {
//        // track status of authentication
//        init.then(function(res){
//        });
//        //Auth.$onAuth(function (user) {
//        //    $rootScope.user=user;
//        //    $rootScope.loggedIn = !!user;
//        //});
//    });
//
//angular.bootstrap(document, ['myApp']);
//obsidian.bootstrap();

//angular.bootstrap(document, ['myApp']);
angular.module('myApp', obsidian.getAppDependencies())
    .run(/*@ngInject*/ function ($rootScope, Auth, init) {
        // track status of authentication
        console.log('myApp');
        init.then(function(res){
        });
        //Auth.$onAuth(function (user) {
        //    $rootScope.user=user;
        //    $rootScope.loggedIn = !!user;
        //});
    });
angular.bootstrap(document, ['myApp']);
