(function () {
    'use strict';

    angular
        .module('app.parts.products')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, obMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/parts/products');

        $stateProvider
            .state('obsidian.admin-default.productList', {
                url: '/prodcuts/list',
                templateUrl: 'app/parts/products/list/list.tmpl.html',
                // set the controller to load for this page
                controller: 'ProductListController',
                controllerAs: 'vm'
            })
            .state('obsidian.admin-default.productDetail', {
                url: '/products/:id/detail',
                templateUrl: 'app/parts/products/detail/detail.tmpl.html',
                // set the controller to load for this page
                controller: 'ProductDetailController',
                controllerAs: 'vm'
            })
            .state('obsidian.admin-default.shoppingCart', {
                url: '/products/shoppingcart',
                templateUrl: 'app/parts/products/shopping-cart/shopping-cart.tmpl.html',
                // set the controller to load for this page
                controller: 'ShoppingCartController',
                controllerAs: 'vm'
            });

        obMenuProvider.addMenu({
            name: 'MENU.PRODUCTS.CART',
            icon: 'fa fa-shopping-cart',
            type: 'dropdown',
            priority: 1.4,
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
