(function() {
    'use strict';

    angular
        .module('obsidian.components')
        .controller('LockController', LockController);

    /* @ngInject */
    function LockController($state, obSettings) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.user = {
            name: 'Morris Onions',
            email: 'info@oxygenna.com',
            password: ''
        };
        vm.obSettings = obSettings;

        ////////////////

        // controller to handle login check
        function loginClick() {
            // user logged in ok so goto the dashboard
            $state.go('obsidian.admin-default.dashboard-general');
        }
    }
})();
