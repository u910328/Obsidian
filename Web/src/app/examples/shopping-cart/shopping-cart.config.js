(function() {
    'use strict';

    angular
        .module('example.shoppingcart-module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, obMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/shopping-cart');

        $stateProvider
        .state('obsidian.admin-default.shoppingcart-page', {
            url: '/shopping-cart/shoppingcart-page',
            templateUrl: 'app/examples/shopping-cart/shopping-cart-page.tmpl.html',
            // set the controller to load for this page
            controller: 'ShoppingCartController',
            controllerAs: 'vm',
        });

        obMenuProvider.addMenu({
            name: 'MENU.SHOPPINGCART.SHOPPINGCART-MODULE',
            icon: 'zmdi zmdi-grade',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'MENU.SHOPPINGCART.SHOPPINGCART-PAGE',
                state: 'obsidian.admin-default.shoppingcart-page',
                type: 'link'
            }]
        });
    }
})();
