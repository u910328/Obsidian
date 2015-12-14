(function() {
    'use strict';

    angular
        .module('app.parts.home')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, obMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/parts/home');

        $stateProvider
        .state('obsidian.admin-default.home', {
            url: '/home',
            templateUrl: 'app/parts/home/home.tmpl.html',
            // set the controller to load for this page
            controller: 'HomePageController',
            controllerAs: 'vm'
        });

        obMenuProvider.addMenu({
            name: 'MENU.HOME',
            icon: 'zmdi zmdi-home',
            type: 'link',
            priority: 1.1,
            state: 'obsidian.admin-default.home'
        });
    }
})();
