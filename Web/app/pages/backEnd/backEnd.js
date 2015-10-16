(function (angular) {
    "use strict";

    var state = 'backEnd',
        url = '/backEnd',
        ctrlName = 'BackEndCtrl',
        templateUrl = 'pages/backEnd/backEnd.html';


    var app = obsidian.module('pages.backEnd', ['pages.backEnd.productManager', 'pages.backEnd.orders']);

    app.controller(ctrlName, /*@ngInject*/ function ($scope, $firebase, snippet, $errorHandler) {
        this.test='1234'
    });


    app.config(function ($stateProvider) {
        $stateProvider
            .state(state, {
                url: url,
                views: {
                    "": {
                        templateUrl: templateUrl,
                        controller: ctrlName,
                        controllerAs:'be'
                    }
                }
            })
            .state(state + '.orders', {
                url: '/orders',
                views: {
                    "content": {
                        templateUrl: 'pages/backEnd/orders/orders.html',
                        controller: 'Orders'
                    }
                }
            })
            .state(state + '.productManager', {
                url: '/productManager',
                views: {
                    "content": {
                        templateUrl: 'pages/backEnd/productManager/productManager.html',
                        controller: 'ProductManager'
                    }
                }
            });
    });


})(angular);