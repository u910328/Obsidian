(function () {
    'use strict';

    angular
        .module('example.products')
        .controller('ProductDetailController', ProductDetailController);

    /* @ngInject */
    function ProductDetailController($firebaseObject, $firebase, $location, $stateParams) {
        var vm = this;
        vm.id=$stateParams.id||'bd_001';
        vm.showDetail= function (itemId) {
            $state.go('obsidian.admin-default.productDetail', {id: itemId})
        }
    }
})();
