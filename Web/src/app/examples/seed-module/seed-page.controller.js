(function() {
    'use strict';

    angular
        .module('example.seed-module')
        .controller('SeedPageController', SeedPageController);

    /* @ngInject */
    function SeedPageController($scope, Auth, $state, $mdDialog, config) {
        var vm = this;
        vm.testData = ['obsidian', 'is', 'great'];

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
                    redirectTo(config.home);
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
                        redirectTo(config.home);
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
                    redirectTo(config.home);
                    return Auth.checkIfAccountExistOnFb(user)
                }, showError)
                .then(Auth.createAccount, showError)
                .then(function(){}, showError)
        }
    }
})();
