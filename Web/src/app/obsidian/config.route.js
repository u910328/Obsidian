(function() {
    'use strict';

    angular
        .module('obsidian')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
        .state('obsidian', {
            abstract: true,
            templateUrl: 'app/obsidian/layouts/default/default.tmpl.html',
            controller: 'DefaultLayoutController',
            controllerAs: 'layoutController'
        })
        .state('obsidian-no-scroll', {
            abstract: true,
            templateUrl: 'app/obsidian/layouts/default/default-no-scroll.tmpl.html',
            controller: 'DefaultLayoutController',
            controllerAs: 'layoutController'
        })
        .state('obsidian.admin-default', {
            abstract: true,
            views: {
                sidebarLeft: {
                    templateUrl: 'app/obsidian/components/menu/menu.tmpl.html',
                    controller: 'MenuController',
                    controllerAs: 'vm'
                },
                sidebarRight: {
                    templateUrl: 'app/obsidian/components/notifications-panel/notifications-panel.tmpl.html',
                    controller: 'NotificationsPanelController',
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateUrl: 'app/obsidian/components/toolbars/toolbar.tmpl.html',
                    controller: 'DefaultToolbarController',
                    controllerAs: 'vm'
                },
                content: {
                    template: '<div id="admin-panel-content-view" class="{{layout.innerContentClass}}" flex ui-view></div>'
                },
                belowContent: {
                    template: '<div ui-view="belowContent"></div>'
                }
            }
        })
        .state('obsidian.admin-default-no-scroll', {
            abstract: true,
            views: {
                sidebarLeft: {
                    templateUrl: 'app/obsidian/components/menu/menu.tmpl.html',
                    controller: 'MenuController',
                    controllerAs: 'vm'
                },
                sidebarRight: {
                    templateUrl: 'app/obsidian/components/notifications-panel/notifications-panel.tmpl.html',
                    controller: 'NotificationsPanelController',
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateUrl: 'app/obsidian/components/toolbars/toolbar.tmpl.html',
                    controller: 'DefaultToolbarController',
                    controllerAs: 'vm'
                },
                content: {
                    template: '<div flex ui-view layout="column" class="overflow-hidden"></div>'
                }
            }
        });
    }
})();
