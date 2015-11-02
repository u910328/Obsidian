(function () {
    'use strict';

    angular
        .module('obsidian.components')
        .factory('promiseService', promiseService);

    /* @ngInject */
    function promiseService($q) {
        var defers = {},
            resolvers = {},
            status={};
        return {
            add: add,
            remove: remove,
            resolve: resolve,
            reject: reject,
            reset: reset,
            all: all,
            get:get
        };

        function add(promiseName, resolver) {
            var def = $q.defer();
            defers[promiseName] = def;
            resolvers[promiseName] = resolver;
            status[promiseName]=0;
            if (angular.isFunction(resolvers[promiseName])) resolvers[promiseName].apply(null, [def.resolve, def.reject]);
            def.promise.then(function () {
                status[promiseName]='resolved'
            }, function () {
                status[promiseName]='rejected'
            });
        }

        function remove(promiseName) {
            delete defers[promiseName];
            delete resolvers[promiseName];
            delete status[promiseName]
        }

        function resolve(promiseName, value) {
            if (defers[promiseName]) {
                defers[promiseName].resolve(value);
            }
        }

        function reject(promiseName, reason) {
            if (defers[promiseName]) {
                defers[promiseName].reject(reason);
            }
        }

        function reset(promiseName, resolver) {
            var _resolver=resolver||resolvers[promiseName]||angular.noop;
            if(status[promiseName]===0){
                var def= defers[promiseName];
                _resolver.apply(null, [def.resolve, def.reject]);
            } else {
                remove(promiseName);
                return add(promiseName, _resolver);
            }
        }

        function get(promiseName) {
            if(angular.isUndefined(status[promiseName])){
                add(promiseName);
            }
            return defers[promiseName].promise
        }


        function all(promiseNameObj){
            var promises={};
            angular.forEach(promiseNameObj, function (value,key) {
                if(angular.isUndefined(status[value])){
                    add(value);
                } else if(angular.isObject(value)&&angular.isFunction(value.then)){
                    promises[key] = value;
                    return;
                }
                promises[key] = defers[value].promise;
            });
            return $q.all(promises)
        }
    }
})();