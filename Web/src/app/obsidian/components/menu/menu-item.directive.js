(function() {
    'use strict';

    angular
        .module('obsidian.components')
        .directive('obMenuItem', obMenuItemDirective);

    /* @ngInject */
    function obMenuItemDirective() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            require: '^obMenu',
            scope: {
                item: '='
            },
            // replace: true,
            template: '<div ng-include="::obMenuItem.item.template"></div>',
            controller: obMenuItemController,
            controllerAs: 'obMenuItem',
            bindToController: true
        };
        return directive;
    }

    /* @ngInject */
    function obMenuItemController($scope, $mdSidenav, $state, $filter, obBreadcrumbsService, $timeout) {
        var obMenuItem = this;
        // load a template for this directive based on the type ( link | dropdown )
        obMenuItem.item.template = 'app/obsidian/components/menu/menu-item-' + obMenuItem.item.type + '.tmpl.html';

        switch(obMenuItem.item.type) {
            case 'dropdown':
                // if we have kids reorder them by priority
                obMenuItem.item.children = $filter('orderBy')(obMenuItem.item.children, 'priority');
                obMenuItem.toggleDropdownMenu = toggleDropdownMenu;
                // add a check for open event
                $scope.$on('toggleDropdownMenu', function(event, item, open) {
                    // if this is the item we are looking for
                    if(obMenuItem.item === item) {
                        obMenuItem.item.open = open;
                    }
                    else {
                        obMenuItem.item.open = false;
                    }
                });
                // this event is emitted up the tree to open parent menus
                $scope.$on('openParents', function() {
                    // openParents event so open the parent item
                    obMenuItem.item.open = true;
                    // also add this to the breadcrumbs
                    obBreadcrumbsService.addCrumb(obMenuItem.item);
                });
                break;
            case 'link':
                obMenuItem.openLink = openLink;

                // on init check if this is current menu
                checkItemActive($state.current.name, $state.params);

                $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
                    checkItemActive(toState.name, toParams);
                });
                break;
        }

        function checkItemActive() {
            // first check if the state is the same
            obMenuItem.item.active = $state.includes(obMenuItem.item.state, obMenuItem.item.params);
            // if we are now the active item reset the breadcrumbs and open all parent dropdown items
            if(obMenuItem.item.active) {
                obBreadcrumbsService.reset();
                obBreadcrumbsService.addCrumb(obMenuItem.item);
                $scope.$emit('openParents');
            }
        }

        function toggleDropdownMenu() {
            $scope.$parent.$parent.$broadcast('toggleDropdownMenu', obMenuItem.item, !obMenuItem.item.open);
        }

        function openLink() {
            $timeout(function () {
                $mdSidenav('left').close();
                var params = angular.isUndefined(obMenuItem.item.params) ? {} : obMenuItem.item.params;
                $state.go(obMenuItem.item.state, params);
                obMenuItem.item.active = true;
            },250);
        }
    }
})();
