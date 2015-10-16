(function (angular) {
    'use strict';

    obsidian.module('myApp.appVersion', [])
        .directive('appVersion', /*@ngInject*/ function (version) {
            return function (scope, elm) {
                elm.text(version);
            };
        });
})(angular);