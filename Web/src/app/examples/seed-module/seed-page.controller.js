(function() {
    'use strict';

    angular
        .module('example.seed-module')
        .controller('SeedPageController', SeedPageController);

    /* @ngInject */
    function SeedPageController($scope, Auth, $state, $mdDialog, config) {
        var vm = this;
        vm.testData = ['obsidian', 'is', 'great'];
    }
})();
