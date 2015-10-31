(function() {
    'use strict';

    angular
        .module('obsidian.components')
        .controller('FooterController', FooterController);

    /* @ngInject */
    function FooterController(obSettings, obLayout) {
        var vm = this;
        vm.name = obSettings.name;
        vm.copyright = obSettings.copyright;
        vm.layout = obLayout.layout;
        vm.version = obSettings.version;
    }
})();