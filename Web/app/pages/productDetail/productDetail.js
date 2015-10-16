(function (angular) {
    "use strict";

    var state = 'productDetail',
        url = '/productDetail/:pid',
        ctrlName = 'ProductDetailCtrl',
        templateUrl = 'pages/productDetail/productDetail.html',
        directiveName = 'productDetail',
        resolve = {
            user: ['Auth', function (Auth) {
                return Auth.$waitForAuth();
            }]
        };

    var app = obsidian.module('pages.productDetail', []);

    app.controller(ctrlName, /*@ngInject*/ function ($scope, $rootScope, user, $firebaseObject, $firebase, $location, $stateParams, $mdDialog) {
        var productId = $stateParams.pid;
        $scope.loggedIn=function(){return $rootScope.loggedIn};
        $scope.id = productId;
        $scope.user = user;
        $scope.loaded = function (value) {
            angular.extend(value, {
                quantity: 1,
                itemId: productId
            })
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    });



//Step 5: config providers.
    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state(state, {
            url: url,
            templateUrl: templateUrl,
            controller: ctrlName,
            resolve: resolve
        });
    }]);

    if (directiveName) {
        app.directive(directiveName, ['linkFn', function (linkFn) {
            return {
                restrict: 'E',
                templateUrl: templateUrl,
                scope: {
                    stateParams: '='
                },
                link: function(scope){
                    linkFn.pagePlusDirective(scope, ctrlName, resolve);
                }
            };
        }]);
    }

})(angular);