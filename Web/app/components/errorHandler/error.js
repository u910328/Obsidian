(function (angular) {
    "use strict";
    var mod = obsidian.module('myApp.errorHandler',[]),
        state = 'error',
        url = '/error/:errorId',
        ctrlName = 'errorCtrl',
        templateUrl = 'components/errorHandler/error.html';


    mod.controller(ctrlName, /*@ngInject*/ function ($scope, $stateParams) {
        //create your own controller here
        $scope.error=$stateParams
    });

    mod.config(/*@ngInject*/ function ($stateProvider) {
        $stateProvider.state(state, {
            url: url,
            templateUrl: templateUrl,
            controller: ctrlName,
            resolve: {
                user: ['Auth', function (Auth) {
                    return Auth.$waitForAuth();
                }]
            }
        });
    });

    mod.factory('$errorHandler', /*@ngInject*/ function ($state) {
        var errorType={

        };

        function openErrorPage(opt) {
            $state.go('error', opt);
            if (!$scope.$$phase) $scope.$apply(); //確保成功轉換頁面
        }

        return function(opt){
            var _opt=opt||{};
            if(!_opt.type){
                return function(error){
                    console.log(JSON.stringify(error));
                }
            } else if(_opt.openErrorPage){
                openErrorPage(_opt)
            }
        };
    });
})(angular);