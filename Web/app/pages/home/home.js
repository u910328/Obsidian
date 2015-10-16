(function (angular) {
    "use strict";

    var state='home',
        url='/home',
        ctrlName='HomeCtrl',
        templateUrl='pages/home/home.html';


    var app = obsidian.module('pages.home', []);

    app.controller(ctrlName, /*@ngInject*/ function ($scope, $state) {
        //
        console.log($state.data);

        $scope.test= function () {
            $state.goWithData('test2',{},{a:'a',b:'b'})
        }
    });

    app.config(['$stateProvider',function($stateProvider){
        $stateProvider.state(state, {
            url: url,
            templateUrl: templateUrl,
            controller: ctrlName
        });
    }]);

})(angular);