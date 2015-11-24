(function () {
    'use strict';

    angular
        .module('app.parts.authentication')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, obMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/parts/authentication');

        $stateProvider
            .state('authentication', {
                abstract: true,
                templateUrl: 'app/parts/authentication/layouts/authentication.tmpl.html'
            })
            .state('authentication.login', {
                url: '/login',
                templateUrl: 'app/parts/authentication/login/login.tmpl.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('authentication.signup', {
                url: '/signup',
                templateUrl: 'app/parts/authentication/signup/signup.tmpl.html',
                controller: 'SignupController',
                controllerAs: 'vm'
            })
            .state('authentication.lock', {
                url: '/lock',
                templateUrl: 'app/parts/authentication/lock/lock.tmpl.html',
                controller: 'LockController',
                controllerAs: 'vm'
            })
            .state('authentication.forgot', {
                url: '/forgot',
                templateUrl: 'app/parts/authentication/forgot/forgot.tmpl.html',
                controller: 'ForgotController',
                controllerAs: 'vm'
            })
            .stateAuthenticated('obsidian.admin-default.profile', {
                url: '/profile',
                templateUrl: 'app/parts/authentication/profile/profile.tmpl.html',
                controller: 'ProfileController',
                controllerAs: 'vm',
                resolve:{
                    userData: /*@ngInject*/ function(promiseService){
                        return promiseService.get('userData')
                    }
                }
            });

        obMenuProvider.addMenu({
            name: 'MENU.AUTH.AUTH',
            icon: 'zmdi zmdi-account',
            type: 'dropdown',
            priority: 4.1,
            children: [{
                name: 'MENU.AUTH.LOGIN',
                state: 'authentication.login',
                type: 'link'
            }, {
                name: 'MENU.AUTH.SIGN_UP',
                state: 'authentication.signup',
                type: 'link'
            }, {
                name: 'MENU.AUTH.FORGOT',
                state: 'authentication.forgot',
                type: 'link'
            }, {
                name: 'MENU.AUTH.LOCK',
                state: 'authentication.lock',
                type: 'link'
            }, {
                name: 'MENU.AUTH.PROFILE',
                state: 'obsidian.admin-default.profile',
                type: 'link'
            }]
        });
    }
})();
