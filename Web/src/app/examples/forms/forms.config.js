(function() {
    'use strict';

    angular
        .module('app.examples.forms')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, obMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/forms');

        $stateProvider
        .state('obsidian.admin-default.forms-inputs', {
            url: '/forms/inputs',
            templateUrl: 'app/examples/forms/inputs.tmpl.html'
        })
        .state('obsidian.admin-default.forms-binding', {
            url: '/forms/binding',
            templateUrl: 'app/examples/forms/binding.tmpl.html'
        })
        .state('obsidian.admin-default.forms-autocomplete', {
            url: '/forms/autocomplete',
            templateUrl: 'app/examples/forms/autocomplete.tmpl.html'
        })
        .state('obsidian.admin-default.forms-wizard', {
            url: '/forms/wizard',
            templateUrl: 'app/examples/forms/wizard.tmpl.html',
            controller: 'FormWizardController',
            controllerAs: 'wizardController'
        })
        .state('obsidian.admin-default.forms-validation', {
            url: '/forms/validation',
            templateUrl: 'app/examples/forms/validation.tmpl.html'
        });

        obMenuProvider.addMenu({
            name: 'MENU.FORMS.FORMS',
            icon: 'zmdi zmdi-calendar-check',
            type: 'dropdown',
            priority: 3.3,
            children: [{
                name: 'MENU.FORMS.AUTOCOMPLETE',
                type: 'link',
                state: 'obsidian.admin-default.forms-autocomplete'
            },{
                name: 'MENU.FORMS.BINDING',
                type: 'link',
                state: 'obsidian.admin-default.forms-binding'
            },{
                name: 'MENU.FORMS.INPUTS',
                type: 'link',
                state: 'obsidian.admin-default.forms-inputs'
            },{
                name: 'MENU.FORMS.WIZARD',
                type: 'link',
                state: 'obsidian.admin-default.forms-wizard'
            },{
                name: 'MENU.FORMS.VALIDATION',
                type: 'link',
                state: 'obsidian.admin-default.forms-validation'
            }]
        });
        obMenuProvider.addMenu({
            type: 'divider',
            priority: 3.4
        });
    }
})();
