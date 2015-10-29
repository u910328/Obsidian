(function() {
    'use strict';

    angular
        .module('example.seed-module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, obMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/seed-module');

        $stateProvider
        .state('obsidian.admin-default.seed-page', {
            url: '/seed-module/seed-page',
            templateUrl: 'app/examples/seed-module/seed-page.tmpl.html',
            // set the controller to load for this page
            controller: 'SeedPageController',
            controllerAs: 'vm'
        });

        obMenuProvider.addMenu({
            name: 'MENU.SEED.SEED-MODULE',
            icon: 'zmdi zmdi-grade',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'MENU.SEED.SEED-PAGE',
                state: 'obsidian.admin-default.seed-page',
                type: 'link'
            }]
        });
    }
})();
