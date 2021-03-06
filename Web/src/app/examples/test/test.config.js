(function() {
    'use strict';

    angular
        .module('app.examples.test')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, obMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/test');

        $stateProvider
        .state('obsidian.admin-default.pay2goTest', {
            // set the url of this page
            url: '/test/pay2goTest',
            // set the html template to show on this page
            templateUrl: 'app/examples/test/pay2goTest.tmpl.html',
            // set the controller to load for this page (in seed-page.controller.js)
            controller: 'Pay2goTestController',
            controllerAs: 'vm'
        }).state('obsidian.admin-default.cryptoTest', {
            // set the url of this page
            url: '/test/cryptoTest',
            // set the html template to show on this page
            templateUrl: 'app/examples/test/cryptoTest.tmpl.html',
            // set the controller to load for this page (in seed-page.controller.js)
            controller: 'CryptoTestController',
            controllerAs: 'vm'
        });

        obMenuProvider.addMenu({
            // give the menu a name to show (should be translatable and in the il8n folder json)
            name: 'MENU.TEST.GROUP-NAME',
            // set an icon for this menu
            icon: 'fa fa-file-text',
            // set the menu type to a dropdown
            type: 'dropdown',
            // set a proirity for this menu item, menu is sorted by priority
            priority: 10.1,
            // create a sub-menu
            children: [{
                name: 'MENU.TEST.PAY2GO',
                // point this menu to the state we created in the $stateProvider above
                state: 'obsidian.admin-default.pay2goTest',
                // set the menu type to a link
                type: 'link'
            },{
                name: 'MENU.TEST.CRYPTO',
                // point this menu to the state we created in the $stateProvider above
                state: 'obsidian.admin-default.cryptoTest',
                // set the menu type to a link
                type: 'link'
            }]
        });
    }
})();
