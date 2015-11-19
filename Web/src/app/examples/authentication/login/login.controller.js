(function () {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, obSettings, Auth, config) {
        var vm = this;

        vm.email = null;
        vm.pass = null;
        vm.confirm = null;
        vm.createMode = false;

        function redirectTo(state) {
            $state.go(state);
        }

        function showError(err) {
            vm.err = angular.isObject(err) && err.code ? err.code : err + '';
        }

        vm.loginOption={};

        vm.login = function (email, pass, opt) {
            vm.err = null;
            Auth.$authWithPassword({email: email, password: pass}, opt)
                .then(function (/* user */) {
                    redirectTo(config.home);
                }, showError);
        };

        vm.loginWithProvider = function (provider, opt) {
            Auth.loginWithProvider(provider, opt)
                .then(function (user) {
                    redirectTo(config.home);
                    return Auth.checkIfAccountExistOnFb(user)
                }, showError)
                .then(Auth.createAccount, showError)
                .then(function () {
                }, showError)
        };

        vm.loginClick = loginClick;
        vm.socialLogins = [{
            provider:'twitter',
            icon: 'fa fa-twitter',
            color: '#5bc0de',
            url: '#'
        }, {
            provider:'facebook',
            icon: 'fa fa-facebook',
            color: '#337ab7',
            url: '#'
        }, {
            provider:'google',
            icon: 'fa fa-google-plus',
            color: '#e05d6f',
            url: '#'
        }, {
            provider:'linkedin',
            icon: 'fa fa-linkedin',
            color: '#337ab7',
            url: '#'
        }];
        vm.obSettings = obSettings;
        // create blank user variable for login form
        vm.user = {
            email: '',
            password: ''
        };

        ////////////////

        function loginClick() {
            $state.go('obsidian.admin-default.introduction');
        }
    }
})();
