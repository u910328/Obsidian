(function (angular) {
    "use strict";

//Step 2: set route, ctrlName and templateUrl.
    var route = '/test',
        ctrlName = 'TestCtrl',
        templateUrl = 'pages/test/test.html';

//Step 3: write down dependency injection.
    var app = obsidian.module('pages.queryTest', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute', 'core.model']);

//Step 4: construct a controller.
    app.controller(ctrlName, /*@ngInject*/ function ($scope, fbutil, $firebase, user, snippet, elasticSearch) {
        $scope.queryString = '';
        $scope.doSearch = function () {
            var query = {"query_string": {"query": "*" + $scope.queryString + "*"}};
            elasticSearch($scope, 'firebase', 'order', query);
        };
        this.user = user;
    });

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when(route, {
            templateUrl: templateUrl,
            controller: ctrlName,
            resolve: {
                user: ['Auth', function (Auth) {
                    return Auth.$waitForAuth();
                }]
            }
        }).otherwise({
            redirectTo: 'home'
        });
    }]);

//Step 5: config providers.
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when(route, { // user whenAuthenticated instead of when if you need this page can only be seen by logged in user. user who did not log in will be redirected to the default route. (loginRedirectPath in config.js)
            templateUrl: templateUrl,
            controller: ctrlName,
            resolve: {
                user: ['Auth', function (Auth) {
                    return Auth.$waitForAuth();
                }]
            }
        }).otherwise({
            redirectTo: 'home'
        });
    }])
        .config(function($stateProvider){
            $stateProvider.state('test', {
                templateUrl: templateUrl
            });
        });

})(angular);

