(function () {
    obsidian.module('core.linkFn', ['firebase'])
        .factory('linkFn', /*@ngInject*/ function ($controller, $injector, $q, snippet, Auth) {
            var linkFn = {
                pagePlusDirective: pagePlusDirective
            };

            function pagePlusDirective(scope, ctrlName, resolveObj) { //TODO:讓不用$scope的controller也能用這個方法
                function refresh() {
                    var locals = {},
                        condition = 0,
                        resolve = resolveObj || {};
                    if (scope['stateParams']) locals['$stateParams'] = scope['stateParams'];
                    locals['$scope'] = scope;

                    for (var key in resolve) {
                        if (typeof $injector.invoke(resolve[key]).then !== 'function') {
                            locals[key] = $injector.invoke(resolve[key])
                        } else {
                            condition++;
                            $injector.invoke(resolve[key]).then(function (resolved) {
                                locals[key] = resolved;
                                waitUntil.resolve();
                            })
                        }
                    }
                    //init controller
                    var waitUntil = new snippet.WaitUntil(condition, function () {
                        $controller(ctrlName, locals);
                    });
                }

                scope.$watch('stateParams', refresh);
                Auth.$onAuth(refresh);

            }

            return linkFn
        });
})();

