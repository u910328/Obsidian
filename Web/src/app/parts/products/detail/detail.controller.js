(function () {
    'use strict';

    angular
        .module('app.parts.products')
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
