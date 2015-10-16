(function (angular) {
    "use strict";

    var state='login',
        url='/login',
        ctrlName='LoginCtrl',
        templateUrl='pages/login/login.html',
        directiveName='obLogin',
        resolve={};

    var app = obsidian.module('pages.login', ['firebase.auth', 'firebase', 'firebase.utils', 'ui.router', 'core.model']);

    app.controller(ctrlName, /*@ngInject*/ function($rootScope, $scope, Auth, $state, fbutil, snippet, $mdDialog) {
        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        $scope.email = null;
        $scope.pass = null;
        $scope.confirm = null;
        $scope.createMode = false;

        $scope.submit = function() {

        };

        function redirectTo(state){
            $state.go(state);
        }

        function showError(err) {
            $scope.err = angular.isObject(err) && err.code? err.code : err + '';
        }

        $scope.login = function(email, pass) {
            console.log(email,pass);
            $scope.err = null;
            Auth.$authWithPassword({ email: email, password: pass }, {rememberMe: true})
                .then(function(/* user */) {
                    $mdDialog.hide();
                    redirectTo('home');
                }, showError);
        };

        $scope.createAccount = function() {
            $scope.err = null;
            if( assertValidAccountProps() ) {
                var email = $scope.email;
                var pass = $scope.pass;
                // create user credentials in Firebase auth system
                Auth.$createUser({email: email, password: pass})
                    .then(function() {
                        // authenticate so we have permission to write to Firebase
                        return Auth.$authWithPassword({ email: email, password: pass });
                    })
                    .then(Auth.createAccount)
                    .then(function(/* user */) {
                        // redirect to home
                        $mdDialog.hide();
                        redirectTo('home');
                    }, showError);
            }
        };

        function assertValidAccountProps() {
            if( !$scope.email ) {
                $scope.err = 'Please enter an email address';
            }
            else if( !$scope.pass || !$scope.confirm ) {
                $scope.err = 'Please enter a password';
            }
            else if( $scope.createMode && $scope.pass !== $scope.confirm ) {
                $scope.err = 'Passwords do not match';
            }
            return !$scope.err;
        }

        $scope.loginWithProvider=function(provider, opt){
            Auth.loginWithProvider(provider, opt)
                .then(function(user) {
                    $mdDialog.hide();
                    redirectTo('home');
                    return Auth.checkIfAccountExistOnFb(user)
                }, showError)
                .then(Auth.createAccount, showError)
                .then(function(){}, showError)
        }
    });

    app.config(['$stateProvider',function($stateProvider){
        $stateProvider.state(state, {
            url: url,
            templateUrl: templateUrl,
            controller: ctrlName
        });
    }]);

    app.run(/*@ngInject*/ function ($rootScope, $mdDialog) {
        $rootScope.showLogin = function ($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'pages/login/loginDialog.html',
                clickOutsideToClose: true,
                controller: 'LoginCtrl'
            });
        };
    });

    if (directiveName) {
        app.directive(directiveName, ['linkFn', function (linkFn) {
            return {
                restrict: 'E',
                templateUrl: templateUrl,
                scope: {
                    stateParams: '@'
                },
                link: function(scope){
                    linkFn.pagePlusDirective(scope, ctrlName, resolve);
                }
            };
        }]);
    }
})(angular);