(function (angular) {
    "use strict";

//Step 2: set route, ctrlName and templateUrl.
    var state = 'test',
        url='/test',
        ctrlName = 'TestCtrl',
        templateUrl = 'pages/test/test.html';

//Step 3: write down dependency injection.
    var app = obsidian.module('pages.test', []);

//Step 4: construct a controller.
    app.controller(ctrlName, /*@ngInject*/ function ($scope, $state, $timeout, fbutil, $firebase) {
        $scope.path='products';
        $scope.id='bd_001';

        $scope.loaded=function(value){
            console.log(value);
            $scope.isLoaded=true
        };

        $scope.from='https://lauchbox.firebaseio.com/products';
        $scope.to='https://lauchbox2.firebaseio.com/products';

        $scope.move=function(from,to){
            $firebase.move(from,to)
        };

        $scope.updateDescription= function (firebaseObject) {
            firebaseObject.$save();
            //for full api, see $firebaseObject section in https://www.firebase.com/docs/web/libraries/angular/api.html
        };

        $scope.getMultipleRefVal= function () {
            $firebase.getMultipleRefVal({
                path1:'test/path1',
                path2:'test/path2/&path1',
                path3:'test/path3/&path1/&path2'
            }).then(function(res){
                $scope.result=res
            })
        };
    });

//Step 5: config providers.
    app.config(function($stateProvider){
            $stateProvider.state(state, {
                templateUrl: templateUrl,
                controller: ctrlName,
                url:url
            });
        });

})(angular);