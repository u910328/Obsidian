(function() {
    'use strict';

    angular
        .module('app.examples.introduction')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, obMenuProvider) {
        // setup translations path
        $translatePartialLoaderProvider.addPart('app/examples/introduction');

        // add routes
        $stateProvider
        .state('obsidian.admin-default.introduction', {
            url: '/introduction',
            templateUrl: 'app/examples/introduction/introduction.tmpl.html',
            controller: 'IntroductionController',
            controllerAs: 'vm'
        });

        // add menu to obsidian
        obMenuProvider.addMenu({
            name: 'MENU.INTRODUCTION.INTRODUCTION',
            state: 'obsidian.admin-default.introduction',
            type: 'link',
            icon: 'zmdi zmdi-info-outline',
            priority: 0.1
        });
        obMenuProvider.addMenu({
            type: 'divider',
            priority: 0.2
        });
    }
})();
