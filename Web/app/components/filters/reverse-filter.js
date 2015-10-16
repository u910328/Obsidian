/* Filters */

(function (angular) {
    'use strict';
    angular.module('myApp')
        .filter('reverse', /*@ngInject*/ function() {
            return function(items) {
                return items.slice().reverse();
            };
        });

})(angular);