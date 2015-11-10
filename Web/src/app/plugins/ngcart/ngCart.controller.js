(function() {
    'use strict';

    angular
        .module('app.plugins.ngcart')
        .controller('CartController',['$scope', 'ngCart', function($scope, ngCart) {
            $scope.ngCart = ngCart;
        }]);
})();
