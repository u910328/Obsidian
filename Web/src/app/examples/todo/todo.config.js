(function() {
    'use strict';

    angular
        .module('app.examples.todo')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, obMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/todo');

        $stateProvider
        .state('obsidian.admin-default.todo', {
            url: '/todo',
            views: {
                '': {
                    templateUrl: 'app/examples/todo/todo.tmpl.html',
                    controller: 'TodoController',
                    controllerAs: 'vm'
                },
                'belowContent': {
                    templateUrl: 'app/examples/todo/fab-button.tmpl.html',
                    controller: 'TodoFabController',
                    controllerAs: 'vm'
                }
            },
            data: {
                layout: {
                    contentClass: 'full-image-background mb-bg-fb-08 background-overlay-static',
                    innerContentClass: 'overlay-gradient-20'
                }
            }
        });

        obMenuProvider.addMenu({
            name: 'MENU.TODO.TITLE',
            icon: 'zmdi zmdi-check',
            state: 'obsidian.admin-default.todo',
            type: 'link',
            badge: Math.round(Math.random() * (20 - 1) + 1),
            priority: 2.2
        });
    }
})();
