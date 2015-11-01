(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController($rootScope) {
        //TODO: wait after user is resolved
        var vm = this;
        vm.settingsGroups = [{
            name: 'ADMIN.NOTIFICATIONS.ACCOUNT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SHOW_LOCATION',
                icon: 'zmdi zmdi-pin',
                enabled: true
            },{
                title: 'ADMIN.NOTIFICATIONS.SHOW_AVATAR',
                icon: 'zmdi zmdi-face',
                enabled: false
            },{
                title: 'ADMIN.NOTIFICATIONS.SEND_NOTIFICATIONS',
                icon: 'zmdi zmdi-notifications-active',
                enabled: true
            }]
        },{
            name: 'ADMIN.NOTIFICATIONS.CHAT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SHOW_USERNAME',
                icon: 'zmdi zmdi-account',
                enabled: true
            },{
                title: 'ADMIN.NOTIFICATIONS.SHOW_PROFILE',
                icon: 'zmdi zmdi-account-box',
                enabled: false
            },{
                title: 'ADMIN.NOTIFICATIONS.ALLOW_BACKUPS',
                icon: 'zmdi zmdi-cloud-upload',
                enabled: true
            }]
        }];
        vm.user={};
        if($rootScope.user) {
            angular.forEach($rootScope.user.info, function (value, key) {
                vm.user[key] = value;
            });
        }
        //vm.user = {
        //    location: 'Sitia, Crete, Greece',
        //    website: 'http://www.oxygenna.com',
        //    twitter: 'oxygenna',
        //    bio: 'We are a small creative web design agency \n who are passionate with our pixels.',
        //    current: '',
        //    password: '',
        //    confirm: ''
        //};
        vm.updateProfile= function () {
            
        }
    }
})();
