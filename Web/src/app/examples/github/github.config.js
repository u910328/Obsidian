(function() {
    'use strict';

    angular
        .module('app.examples.github')
        .config(config);

    /* @ngInject */
    function config($translatePartialLoaderProvider, $stateProvider, obMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/github');

        $stateProvider
        .state('obsidian.admin-default.github', {
            url: '/github',
            templateUrl: 'app/examples/github/github.tmpl.html',
            controller: 'GithubController',
            controllerAs: 'vm',
            data: {
                layout: {
                    contentClass: 'full-image-background mb-bg-fb-16 background-overlay-static',
                    innerContentClass: 'overlay-gradient-20'
                }
            }
        });

        obMenuProvider.addMenu({
            name: 'MENU.GITHUB.GITHUB',
            state: 'obsidian.admin-default.github',
            type: 'link',
            icon: 'fa fa-github',
            priority: 2.2
        });
    }
})();