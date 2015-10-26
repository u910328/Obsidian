(function() {
    'use strict';

    angular
        .module('triangular.components')
        .provider('triMenu', menuProvider);


    /* @ngInject */
    function menuProvider() {
        // Provider
        var menu = [];

        this.addMenu = addMenu;
        this.removeMenu = removeMenu;

        function addMenu(item) {
            menu.push(item);
        }

        function removeMenu(state, params) {
            findAndDestroyMenu(menu, state, params);
        }

        function findAndDestroyMenu(menu, state, params) {
            if (menu instanceof Array) {
                for (var i = 0; i < menu.length; i++) {
                    if(menu[i].state === state && menu[i].params === params) {
                        menu.splice(i, 1);
                    }
                    else if(angular.isDefined(menu[i].children)) {
                        findAndDestroyMenu(menu[i].children, state, params);
                    }
                }
            }
        }

        // Service
        this.$get = function() {
            return {
                menu: menu,
                addMenu: addMenu,
                removeMenu: removeMenu
            };
        };
    }
})();

