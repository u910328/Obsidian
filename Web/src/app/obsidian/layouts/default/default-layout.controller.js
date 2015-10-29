'use strict';

/**
 * @ngdoc function
 * @name AdminController
 * @module obsidian
 * @kind function
 *
 * @description
 *
 * Handles the admin view
 */
(function() {
    'use strict';

    angular
        .module('obsidian.layouts')
        .controller('DefaultLayoutController', DefaultLayoutController);

    /* @ngInject */
    function DefaultLayoutController($scope, $element, obLayout) {
        // we need to use the scope here because otherwise the expression in md-is-locked-open doesnt work
        $scope.layout = obLayout.layout; //eslint-disable-line
        var vm = this;

        vm.activateHover = activateHover;
        vm.removeHover  = removeHover;

        ////////////////

        function activateHover() {
            if(obLayout.layout.sideMenuSize === 'icon') {
                $element.find('.admin-sidebar-left').addClass('hover');
            }
        }

        function removeHover () {
            if(obLayout.layout.sideMenuSize === 'icon') {
                $element.find('.admin-sidebar-left').removeClass('hover');
            }
        }
    }
})();
