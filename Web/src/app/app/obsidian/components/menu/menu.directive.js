(function() {
    'use strict';

    angular
        .module('obsidian.components')
        .directive('obMenu', obMenuDirective);

    /* @ngInject */
    function obMenuDirective($location, $mdTheming, obTheming) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template: '<md-content><ob-menu-item ng-repeat="item in obMenuController.menu | orderBy:\'priority\'" item="::item"></ob-menu-item></md-content>',
            scope: {},
            controller: obMenuController,
            controllerAs: 'obMenuController',
            link: link
        };
        return directive;

        function link($scope, $element) {
            $mdTheming($element);
            var $mdTheme = $element.controller('mdTheme'); //eslint-disable-line

            var menuColor = obTheming.getThemeHue($mdTheme.$mdTheme, 'primary', 'default');
            var menuColorRGBA = obTheming.rgba(menuColor.value);
            $element.css({ 'background-color': menuColorRGBA });
            $element.children('md-content').css({ 'background-color': menuColorRGBA });
        }
    }

    /* @ngInject */
    function obMenuController(obMenu) {
        var obMenuController = this;
        // get the menu and order it
        obMenuController.menu = obMenu.menu;
    }
})();
