(function () {
    'use strict';

    angular
        .module('app.parts.products')
        .controller('ProductListController', ProductListController);

    /* @ngInject */
    function ProductListController($firebase, obNotificationsService, $state, $mdDialog, config) {
        var vm = this;
        vm.showDetail= function (itemId) {
            $state.go('obsidian.admin-default.productDetail', {id: itemId})
        }
    }
})();
