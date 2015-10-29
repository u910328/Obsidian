(function() {
    'use strict';

    angular
        .module('obsidian.directives')
        .directive('obSamePassword', samePassword);

    /* @ngInject */
    function samePassword() {
        // Usage:
        //
        // ```html
        // <form name="signup">
        //     <input name="password" type="password" ng-model="user.password" same-password="signup.confirm" />
        //     <input name="confirm" type="password" ng-model="user.confirm" same-password="signup.confirm" />
        // </form>
        // ```
        // Creates:
        //
        // `samePassword` is a directive with the purpose to validate a password input based on the value of another input.
        // When both input values are the same the inputs will be set to valid

        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: link,
            scope: {
                obSamePassword: '='
            }
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            ngModel.$viewChangeListeners.push(function() {
                ngModel.$setValidity('samePassword', scope.obSamePassword.$modelValue === ngModel.$modelValue);
                scope.obSamePassword.$setValidity('samePassword', scope.obSamePassword.$modelValue === ngModel.$modelValue);
            });
        }
    }
})();
