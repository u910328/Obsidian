(function() {
    'use strict';

    angular
        .module('example.seed-module')
        .controller('SeedPageController', SeedPageController);

    /* @ngInject */
    function SeedPageController() {
        var vm = this;
        vm.testData = ['obsidian', 'is', 'ok'];
    }
})();
