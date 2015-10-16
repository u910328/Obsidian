(function (angular) {
    "use strict";

//Step 2: set route, ctrlName and templateUrl.
    var state = 'test2',
        url = '/test2',
        ctrlName = 'Test2Ctrl',
        templateUrl = 'pages/test2/test2.html',
        directiveName = '';

//Step 3: write down dependency injection.
    var app = obsidian.module('pages.test2', []);

//Step 4: construct a controller.
    app.controller(ctrlName, /*@ngInject*/ function ($scope, $state, $firebase, $rootScope) {

        console.log($state.data);
        $scope.changed=function(){
            console.log('data changed to '+$scope.inputDelayTest)
        };
        var loadList = [
            {
                refUrl: 'products/bd_001'
            },
            {
                refUrl: 'products/bd_002'
            },
            {
                refUrl: 'products',
                opt:{
                    orderBy:'Key',
                    limitToFirst:2
                }
            }
        ];
        $firebase.load(loadList).then(function(res){
            console.log(res);
        });


        $scope.test=function(){
            $state.go('home', {test:'test'})
        }
    });

//Step 5: config providers.
    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state(state, {
            templateUrl: templateUrl,
            controller: ctrlName,
            url: url
        });
    }]);

    if (directiveName) {
        app.directive(directiveName, ['$controller', function ($controller) {
            return {
                restrict: 'E',
                templateUrl: templateUrl,
                scope: {
                    stateParams: '@'
                },
                link: function (scope, iElement, iAttrs) {
                    scope.$watch('initparams', function () {
                        $controller(ctrlName, {$scope: scope});
                    })
                }
            };
        }]);
    }


})(angular);