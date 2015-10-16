(function () {
    obsidian.module('core.model', ['firebase'])
        .factory('model', /*@ngInject*/ function (config, fbutil, $q, snippet) {
            var model = {
                update: update,
                ModelObj: ModelObj,
                init: init,
                action: {},
                view: {}
            };

            function ModelObj(modelPath) {
                this.modelPathArr = modelPath.split("|");
                this.pathArr = this.modelPathArr[0].split(".");
                /*this.val=function(){
                 var value={},
                 modelPath="";

                 for(var j=0; j<that.pathArr.length; j++){
                 modelPath=modelPath+"['"+that.pathArr[j]+"']"
                 }
                 for(var i=1; i<that.modelPathArr.length; i++){
                 value[that.modelPathArr[i]]=eval("model"+modelPath)[that.modelPathArr[i]];
                 }

                 if(JSON.stringify(value)==="{}"){
                 eval("value=model"+modelPath)
                 }

                 return value
                 }*/
            }

            ModelObj.prototype = {
                val: function () {
                    var value = {},
                        modelPath = "";

                    for (var j = 0; j < this.pathArr.length; j++) {
                        modelPath = modelPath + "['" + this.pathArr[j] + "']"
                    }
                    for (var i = 1; i < this.modelPathArr.length; i++) {
                        value[this.modelPathArr[i]] = eval("model" + modelPath)[this.modelPathArr[i]];
                    }

                    if (JSON.stringify(value) === "{}") {
                        eval("value=model" + modelPath)
                    }
                    return value
                }
            };

            function init(scope, keyArrOrStr, refresh) {
                if (typeof keyArrOrStr === 'string') {
                    model[keyArrOrStr] = refresh ? {} : model[keyArrOrStr] || {};
                    scope[keyArrOrStr] = model[keyArrOrStr];
                    return
                }
                for (var i = 0; i < keyArrOrStr.length; i++) {
                    model[keyArrOrStr[i]] = refresh ? {} : model[keyArrOrStr[i]] || {};
                    scope[keyArrOrStr[i]] = model[keyArrOrStr[i]]
                }
            }

            function update(path, value, valuePathArr) {
                var pathArr = path.split(".");
                if (valuePathArr != undefined) {
                    snippet.evalAssignment([model, pathArr], valuePathArr);
                } else {
                    snippet.evalAssignment([model, pathArr], [value]);
                }
                //updateView(path)
            }

            return model
        })
        .factory('$stateData', /*@ngInject*/ function (model) {
            var o = {
                get data() {
                    var cache = model._stateTransitionCache;
                    delete model._stateTransitionCache;
                    return cache;
                }
            };
            return o.data
        })
        .run(/*@ngInject*/ function ($state, model, $rootScope) {
            var activeStates = {};
            $state.goWithData = function (to, params, data, options) {
                var clear = $rootScope.$on('$stateChangeStart', function () {
                    clear();
                    activeStates[$state.href(to, params)] = {data: data};
                    var clearAgain = $rootScope.$on('$stateChangeStart', function () {
                        clearAgain();
                        delete activeStates[$state.href(to, params)]
                    })
                });
                return $state.go(to, params, options);
            };

            //define a getter so that user can retrieve data by using $state.data
            Object.defineProperty($state, "data", {
                get: function () {
                    var state = activeStates[$state.href($state.current.name, $state.params)] || {};
                    return state.data
                }
            });


        });
})();

