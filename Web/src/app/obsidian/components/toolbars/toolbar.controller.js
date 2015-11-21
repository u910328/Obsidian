(function () {
    'use strict';

    angular
        .module('obsidian.components')
        .controller('DefaultToolbarController', DefaultToolbarController);

    /* @ngInject */
    function DefaultToolbarController(config, $scope, $rootScope, Auth, $mdMedia, $translate, $state, $element, $filter, $mdUtil, $mdSidenav, $mdToast, $timeout, ngCart, obBreadcrumbsService, obSettings, obNotificationsService, obLayout) {
        var vm = this;
        vm.breadcrumbs = obBreadcrumbsService.breadcrumbs;
        vm.emailNew = false;
        vm.languages = obSettings.languages;
        vm.logout = logout;
        vm.openSideNav = openSideNav;
        vm.hideMenuButton = hideMenuButton;
        vm.switchLanguage = switchLanguage;
        vm.toggleNotificationsTab = toggleNotificationsTab;
        vm.notificationSubTotal = notificationSubTotal;
        vm.cartSubTotal = cartSubTotal;

        ////////////////

        function logout() {
            $state.go(config.home);
            Auth.$unauth();
        }

        function openSideNav(navID) {
            $mdUtil.debounce(function () {
                $mdSidenav(navID).toggle();
            }, 300)();
        }

        function switchLanguage(languageCode) {
            $translate.use(languageCode)
                .then(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .content($filter('translate')('MESSAGES.LANGUAGE_CHANGED'))
                            .position('bottom right')
                            .hideDelay(500)
                    );
                });
        }

        function hideMenuButton() {
            return obLayout.layout.sideMenuSize !== 'hidden' && $mdMedia('gt-md');
        }

        function toggleNotificationsTab(tab) {
            $rootScope.$broadcast('obSwitchNotificationTab', tab);
            vm.openSideNav('notifications');
        }

        function notificationSubTotal() {
            return obNotificationsService.getSubTotal()
        }

        function cartSubTotal() {
            return ngCart.getTotalItems()
        }

        $scope.$on('newMailNotification', function () {
            vm.emailNew = true;
        });
    }
})();
