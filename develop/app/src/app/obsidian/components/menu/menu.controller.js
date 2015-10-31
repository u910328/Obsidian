(function() {
    'use strict';

    angular
        .module('obsidian.components')
        .controller('MenuController', MenuController);

    /* @ngInject */
    function MenuController(obSettings, obLayout) {
        var vm = this;
        vm.layout = obLayout.layout;
        vm.sidebarInfo = {
            appName: obSettings.name,
            appLogo: obSettings.logo
        };
        vm.toggleIconMenu = toggleIconMenu;

        ////////////
        function toggleIconMenu() {
            var menu = vm.layout.sideMenuSize === 'icon' ? 'full' : 'icon';
            obLayout.setOption('sideMenuSize', menu);
        }
    }
})();
