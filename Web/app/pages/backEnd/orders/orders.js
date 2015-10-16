(function (angular) {

    var app = angular.module('pages.backEnd.orders', []);

//Step 4: construct a controller. Notice that $scope is required, don't delete it.
    app.controller('Orders', /*@ngInject*/ function ($scope, filterUtil, customFn, $firebaseArray, $firebase, snippet, $errorHandler) {
        //to show orders
        $scope.loadOrders = function (startDay, endDay) {
            var now = (new Date).getTime(),
                day = 24 * 60 * 60 * 1000;
            var ref = $firebase.ref('orders').orderByChild('schedule').startAt(now + startDay * day).endAt(now + endDay * day);

            //to prevent memory leak
            if($scope.allOrdersSrc) $scope.allOrdersSrc.$destroy();
            if($scope.unwatchFilter) $scope.unwatchFilter();

            $scope.allOrdersSrc = $firebaseArray(ref);
            $scope.allOrdersSrc.$loaded().then(function(){
                $scope.unwatchFilter=filterUtil.watchFilterOpts($scope, 'allOrdersSrc', 'allOrders', 'filters');
            })
        };


        //$scope.loadOrders(-0.5, 1); //today's order



        $scope.filterOpt={};
        $scope.refreshFilter = function () {
            $scope.search=$scope.search? $scope.search:'';
            var searcKeyhArr=$scope.search.split(' '); //let filter match several keys
            $scope.filters=angular.extend({}, $scope.filterOpt, searcKeyhArr);
        };

        $scope.$watch('filterOpt', function(){
            $scope.refreshFilter();
        }, true);


        $scope.statusOptions = ['received', 'preparing', 'ready', 'picked-up'];
        $scope.orderStatus = {};

        $scope.changeOrderStatus = function (orderId, userId, changedStatus) {
            console.log(orderId, userId, changedStatus);
            var values = [
                {
                    refUrl: 'orders/' + orderId + '/orderStatus',
                    value: changedStatus,
                    set: true
                },
                {
                    refUrl: 'users/' + userId + '/orderHistory/' + orderId + '/orderStatus',
                    value: changedStatus,
                    set: true
                }
            ];
            $firebase.batchUpdate(values, true).then(angular.noop, $errorHandler({}));
        };
        $scope.calcSubTotal = customFn.calcSubTotal;


        $scope.removeOrder = function (orderId, userId, reason) {
            var values = [
                {
                    refUrl: 'users/' + userId + '/orderHistory/' + orderId,
                    value: null,
                    set: true
                },
                {
                    refUrl: 'orders/' + orderId,
                    value: null,
                    set: true
                }
            ];
            $firebase.batchUpdate(values, true).then(function(){
                $scope.refreshFilter();
            })
        };
    });



})(angular);

