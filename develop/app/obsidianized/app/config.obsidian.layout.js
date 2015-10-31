(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config(obLayoutProvider) {
        obLayoutProvider.setDefaultOption('toolbarSize', 'default');

        obLayoutProvider.setDefaultOption('toolbarShrink', false);

        obLayoutProvider.setDefaultOption('toolbarClass', '');

        obLayoutProvider.setDefaultOption('contentClass', '');

        obLayoutProvider.setDefaultOption('sideMenuSize', 'full');

        obLayoutProvider.setDefaultOption('showToolbar', true);

        obLayoutProvider.setDefaultOption('footer', true);
    }
})();