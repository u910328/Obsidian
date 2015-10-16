(function (angular) {
    "use strict";
//Step 1: replace 'pageSeed' to any name you prefer.
    var mod = obsidian.module('pageSeed', ['firebase.auth', 'firebase', 'firebase.utils', 'core.model']);

//Step 2: simple configuration for the state.
    var state = 'pageSeed',
        url = '/pageSeed',
        ctrlName = 'PageSeedCtrl',
        templateUrl = 'pages/pageSeed/pageSeed.html',
        directiveName = 'pageSeedDirective',
        resolve = {
            // forces the page to wait for this promise to resolve before controller is loaded
            // the controller can then inject `user` as a dependency. This could also be done
            // in the controller, but this makes things cleaner (controller doesn't need to worry
            // about auth status or timing of accessing data or displaying elements)
            user: ['Auth', function (Auth) {
                return Auth.$waitForAuth();
            }]
        };

//Step 3: config the state in detail if needed.
    mod.config(/*@ngInject*/ function ($stateProvider) {
        $stateProvider.state(state, {
            url: url,
            templateUrl: templateUrl,
            controller: ctrlName,
            resolve: resolve
        });
    });

//Step 4: build the controller.
    mod.controller(ctrlName, /*@ngInject*/ function ($scope) {
        //create your own controller here
    });


//Step 5: give a name for the directive in step 2 if you want put this state into a widget.
    if (directiveName) {
        mod.directive(directiveName, /*@ngInject*/ function (linkFn) {
            return {
                restrict: 'E',
                templateUrl: templateUrl,
                scope: {
                    stateParams: '@'
                },
                link: function (scope) {
                    linkFn.pagePlusDirective(scope, ctrlName, resolve);
                }
            };
        });
    }
})(angular);
