(function () {
    'use strict';

    angular
        .module('example.products')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, obMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/products');

        $stateProvider
            .state('obsidian.admin-default.productList', {
                url: '/prodcuts/list',
                templateUrl: 'app/examples/products/list/list.tmpl.html',
                // set the controller to load for this page
                controller: 'ProductListController',
                controllerAs: 'vm'
            })
            .state('obsidian.admin-default.productDetail', {
                url: '/products/:id/detail',
                templateUrl: 'app/examples/products/detail/detail.tmpl.html',
                // set the controller to load for this page
                controller: 'ProductDetailController',
                controllerAs: 'vm'
            })
            .state('obsidian.admin-default.shoppingCart', {
                url: '/products/shoppingcart',
                templateUrl: 'app/examples/products/shopping-cart/shopping-cart.tmpl.html',
                // set the controller to load for this page
                controller: 'ShoppingCartController',
                controllerAs: 'vm'
            });

        obMenuProvider.addMenu({
            name: 'MENU.PRODUCTS.CART',
            icon: 'fa fa-shopping-cart',
            type: 'dropdown',
            priority: 2.1,
            children: [{
                name: 'MENU.PRODUCTS.LIST',
                state: 'obsidian.admin-default.productList',
                type: 'link'
            }, {
                name: 'MENU.PRODUCTS.DETAIL',
                state: 'obsidian.admin-default.productDetail',
                type: 'link'
            }, {
                name: 'MENU.PRODUCTS.SHOPPINGCART',
                state: 'obsidian.admin-default.shoppingCart',
                type: 'link'
            }]
        });
    }
})();
