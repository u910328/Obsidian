(function() {
    'use strict';

    angular
        .module('app.parts.menu')
        .service('dynamicMenuService', dynamicMenuService);

    /* @ngInject */
    function dynamicMenuService() {
        this.dynamicMenu = {
            showDynamicMenu: false
        };
    }
})();
