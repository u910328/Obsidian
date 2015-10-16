(function (angular) {
    "use strict";

//Step 2: set route, ctrlName and templateUrl.
    var state='invoice',
        url='/invoice/:orderId',
        ctrlName='InvoiceCtrl',
        templateUrl='pages/invoice/invoice.html';

//Step 3: write down dependency injection.
    var app = obsidian.module('pages.invoice', []);

//Step 4: construct a controller.
    app.controller(ctrlName, /*@ngInject*/ function ($scope, $firebaseObject, $state, customFn) {
        console.log($state.data);
        $scope.invoice=$state.data;
        //$scope.subTotal=customFn.calcSubTotal('', $stateParams.products);
        $scope.date=new Date();
        $scope.OK=function(){
            $state.go('home')
        }

    });

//Step 5: config providers.
    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state(state, {
            url: url,
            templateUrl: templateUrl,
            controller: ctrlName,
            resolve: {
                user: ['Auth', function (Auth) {
                    return Auth.$waitForAuth();
                }]
            }
        });
    }]);


})(angular);