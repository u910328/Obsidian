(function (angular) {
    "use strict";

//Step 2: set route, ctrlName and templateUrl.
    var state='productList',
        url='/productList',
        ctrlName='ProductListCtrl',
        templateUrl='pages/productList/productList.html';

//Step 3: write down dependency injection.
    var app = obsidian.module('pages.productList', []);

//Step 4: construct a controller.
    app.controller(ctrlName, /*@ngInject*/ function ($rootScope, $scope, $mdDialog) {
        $scope.showDetail= function($event, pid) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl:'pages/productDetail/productDetail.html',
                locals: {
                    $stateParams: {pid:pid},
                    user: $rootScope.user
                },
                clickOutsideToClose: true,
                controller: 'ProductDetailCtrl'
            });
        }
    });

//Step 5: config providers.
    app.config(['$stateProvider',function($stateProvider){
        $stateProvider.state(state, {
            url: url,
            templateUrl: templateUrl,
            controller: ctrlName
        });
    }]);

})(angular);