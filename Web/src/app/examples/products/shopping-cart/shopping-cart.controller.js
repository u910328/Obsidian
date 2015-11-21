(function () {
    'use strict';

    angular
        .module('example.products')
        .controller('ShoppingCartController', ShoppingCartController);

    /* @ngInject */
    function ShoppingCartController($firebase, obNotificationsService, $state, $mdDialog, config) {
        var vm = this;
    }
})();
