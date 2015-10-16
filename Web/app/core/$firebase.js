(function () {
    obsidian.module('core.$firebase', ['firebase'])
        .factory('$firebase', /*@ngInject*/ function (FBURL, config, fbutil, $firebaseObject, $q, snippet) {
            var $firebase = {
                FbObj: FbObj,
                update: update,
                set: set,
                batchUpdate: batchUpdate,
                params: {},
                databases: {},
                ref: ref,
                $communicate: $communicate,
                $object: $object,
                getMultipleRefVal: getMultipleRefVal,
                isRefUrlValid: isRefUrlValid,
                move: move,
                load: load
            };

            var activeRefUrl = {};

            function FbObj(refUrl, opt) {
                var _opt = opt || {},
                    _refUrl = refUrl || '',
                    db = $firebase.databases[_refUrl.split("@")[1]] || {};

                function isDbOnline() {
                    if (_opt.keepOnline !== undefined) return !!_opt.keepOnline;
                    if (db.keepOnline !== undefined) return !!db.keepOnline;
                    return true
                }

                this.dbName = db.Name || FBURL.split("//")[1].split(".fi")[0];
                this.dbUrl = "https://" + this.dbName + ".firebaseio.com";
                this.path = _refUrl.split("@")[0];
                this.url = this.dbUrl + "/" + this.path;
                this.t = (new Date).getTime().toString();
                this.params = _opt.params || {};
                this.keepOnline = isDbOnline();
            }

            FbObj.prototype = {
                ref: function () {
                    var ref = new Firebase(this.dbUrl);
                    if (this.path === '') return ref;
                    var pathArr = this.path.split("/");
                    for (var i = 0; i < pathArr.length; i++) {
                        if (pathArr[i].charAt(0) === "$") {
                            ref = ref.push();
                            this.params[pathArr[i]] = ref.key();
                        } else {
                            ref = ref.child(pathArr[i]);
                        }
                    }
                    this.url = ref.toString();
                    this.path = this.url.split(".com/")[1];
                    return ref
                },
                goOnline: function () {
                    if (activeRefUrl[this.dbUrl] === undefined) {
                        activeRefUrl[this.dbUrl] = []
                    }
                    if (activeRefUrl[this.dbUrl].length === 0) {
                        if (!this.keepOnline) {
                            Firebase.goOnline(this.dbUrl);
                            console.log(this.dbUrl, "is online", this.t)
                        }
                    }
                    activeRefUrl[this.dbUrl].push(this.t);
                    return this
                },
                goOffline: function () {
                    if (this.keepOnline) return this;
                    if (activeRefUrl[this.dbUrl] === undefined) {
                        activeRefUrl[this.dbUrl] = []
                    }
                    if (activeRefUrl[this.dbUrl].length === 1) {
                        if (!this.keepOnline) {
                            Firebase.goOffline(this.dbUrl);
                            console.log(this.dbUrl, "is offline", this.t)
                        }
                    }
                    var tPos = activeRefUrl[this.dbUrl].indexOf(this.t);
                    if (tPos != -1) {
                        activeRefUrl[this.dbUrl].splice(tPos, 1);
                    }
                    return this
                }
            };

            function ref(refUrl, opt) {
                var fbObj = new FbObj(refUrl, opt);
                return fbObj.ref()
            }

            function queryRef(refUrl, options) {
                var opt = options || {},
                    ref = $firebase.ref(refUrl);
                if (opt.orderBy) {
                    var orderBy = 'orderBy' + opt.orderBy.split(':')[0];
                    if (orderBy === 'orderByChild') {
                        ref = ref[orderBy](opt.orderBy.split(':')[1]); //ex {orderBy:'Child:name'}
                    } else {
                        ref = ref[orderBy]();
                    }

                } else {
                    return ref
                }
                if (opt.startAt) {
                    ref = ref['startAt'](opt.startAt);
                }
                if (opt.endAt) {
                    ref = ref['endAt'](opt.endAt);
                }
                if (opt.equalTo) {
                    ref = ref['equalTo'](opt.equalTo);
                }
                if (opt.limitToFirst) {
                    ref = ref['limitToFirst'](opt.limitToFirst);
                }
                if (opt.limitToLast) {
                    ref = ref['limitToLast'](opt.limitToLast);
                }
                return ref;
            }

            var objectRepo = {};

            function $object(refUrl) {
                if (objectRepo[refUrl]) {
                    return objectRepo[refUrl]
                } else {
                    objectRepo[refUrl] = $firebaseObject(ref(refUrl));
                    return objectRepo[refUrl]
                }
            }

            function isRefUrlValid(refUrl) {
                return (typeof refUrl === 'string') && (refUrl.split('/').indexOf('') === -1)
            }

            //TODO:用$q改寫
            function Digest(scope, fbObj, isSync, delay) {
                var timeout;
                this.reset = function (callback, customDelay) {
                    if (timeout != undefined) clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        if (callback) callback.apply(null);
                        if (!isSync) fbObj.goOffline();
                        if (scope) scope.$digest();
                    }, customDelay || delay);
                }
            }

            function load(loadList, defaultOpt) {
                var _defaultOpt = (typeof defaultOpt === 'object') ? defaultOpt : {},
                    defers = {},
                    promises = {};

                function onComplete(key) {
                    return function (snap) {
                        defers[key].resolve(snap.val())
                    }
                }

                for (var key in loadList) {
                    if (loadList.hasOwnProperty(key)) {
                        defers[key] = $q.defer();
                        promises[key] = defers[key].promise;
                        var loadObj = loadList[key],
                            ref = queryRef(loadObj.refUrl, loadObj.opt || _defaultOpt);

                        ref.once('value', onComplete(key))
                    }
                }
                return $q.all(promises)
            }

            function update(refUrl, value, onComplete, removePrev, refUrlParams) {
                var def = $q.defer();
                var replacedRefUrl = snippet.replaceParamsInString(refUrl, refUrlParams);
                var fbObj = new FbObj(replacedRefUrl), ref = fbObj.ref(), type = removePrev ? 'set' : 'update';

                //將因push而自動生成的key值放到value內相對應的property中
                var params = angular.extend({}, refUrlParams, fbObj.params);
                //console.log(JSON.stringify(params));
                if (typeof value === 'object' && value != null) {
                    for (var key in params) {
                        var realKey = key.split('$')[1];
                        if (value[realKey] === undefined) continue;
                        value[realKey] = params[key];
                    }
                } else if (typeof value === 'string') {
                    for (var key in params) {
                        value.replace(key, params[key]);
                    }
                }

                fbObj.goOnline();

                ref[type](value, function (error) {
                    if (onComplete) onComplete.apply(null, [error]);
                    if (error) {
                        console.log("Update failed: " + refUrl);
                        def.reject(error);
                    } else {
                        if (config.debug) {
                            console.log("Update success: " + refUrl)
                        }
                        def.resolve();
                    }
                    fbObj.goOffline();
                });

                def.promise.params = fbObj.params;

                return def.promise
            }

            function set(refUrl, value, onComplete, refUrlParams) {
                update(refUrl, value, onComplete, true, refUrlParams);
            }

//TODO: Transaction

            function batchUpdate(values, isConsecutive) {
                var def = $q.defer(),
                    refUrlParams = angular.extend({}, $firebase.params),
                    _isConsecutive = (isConsecutive || isConsecutive === undefined);

                function update(i) {
                    var params = $firebase.update(values[i].refUrl, values[i].value, onComplete(i), values[i].set, refUrlParams).params;
                    refUrlParams = angular.extend(refUrlParams, params);
                }

                function onComplete(i) {

                    function consecutive(error) {  //防止最後實際執行onComplete時使用的是跑完loop後的j的值
                        var isLast = i === (values.length - 1);

                        if (values[i] && values[i].onComplete) values[i].onComplete.apply(null, [error]);
                        if (error) {
                            def.reject(error);
                        } else {
                            if (isLast) {
                                def.resolve({params: refUrlParams});
                            } else {
                                update(i + 1);
                            }
                        }
                    }

                    function nonConsecutive(error) {
                        if (values[i] && values[i].onComplete) values[i].onComplete.apply(null, [error]);
                        if (error) {
                            defers[i].reject(error)
                        } else {
                            defers[i].resolve();
                        }
                    }

                    return _isConsecutive ? consecutive : nonConsecutive
                }

                if (_isConsecutive) {
                    update(0);
                } else {
                    var defers = [],
                        promises = [];
                    for (var i = 0; i < values.length; i++) {
                        defers[i] = $q.defer();
                        promises[i] = defers[i].promise;
                        update(i);
                    }
                    $q.all(promises).then(function () {
                        def.resolve({params: refUrlParams})
                    }, function (error) {
                        def.reject(error);
                    });
                }

                return def.promise
            }

            function move(from, to) {
                var sourceRef = new Firebase(from),
                    targetRef = new Firebase(to);
                sourceRef.once('value', function (snap) {
                    targetRef.update(snap.val());
                })
            }

            function $transfer(from, to) {
                var sourceRef = new Firebase(from.refUrl),
                    targetRef = new Firebase(to.refUrl),
                    def = $q.defer();
                sourceRef.once('value', function (snap) {
                    var value = from.modifier && (typeof modifier === 'function') ? from.modifier(snap.val()) : snap.val();
                    targetRef.update(value, function (error) {
                        if (error) {
                            def.reject(error);
                        } else {
                            def.resolve();
                        }
                    });
                })
            }

            function $communicate(opt) {
                var res = {}, def = $q.defer();
                if (typeof opt !== 'object') return;

                batchUpdate(opt.request, true).then(function (resolveVal) {
                    if (!opt.response) {
                        def.resolve(resolveVal);
                        return
                    }
                    angular.extend(res, resolveVal);
                    var resUrlArr = snippet.replaceParamsInObj(opt.response, resolveVal.params);

                    getResponse(resUrlArr).then(function (response) {
                        angular.extend(res, response);
                        def.resolve(res);
                    }, function (error) {
                        def.reject(error);
                    })
                }, function (error) {
                    def.reject(error);
                });
                return def.promise
            }

            function getResponse(refs) {
                var isRenew = {}, promises = {};

                function onComplete(key, refUrl) {
                    var def = $q.derfer();
                    promises[key] = def.promise;

                    var onSuccess = function (snap) {
                        if (isRenew[key] === true) {
                            def.resolve(snap.val());
                            ref(refUrl).off();
                        } else {
                            isRenew[key] = true; //server hasn't change the data.
                        }
                    };
                    var onError = function (err) {
                        def.reject(err)
                    };

                    return [onSuccess, onError]
                }

                for (var key in refs) {
                    if (refs.hasOwnProperty(key)) ref(refs[key]).on('value', onComplete(key, refs[key])[0], onComplete(key, refs[key])[1]);
                }
                return $q.all(promises);
            }

            function getMultipleRefVal(refs, opt) {
                var _opt = opt ? opt : {};

                var res = {},
                    params = {},
                    onComplete = {},
                    onGoingRef = {},
                    def = $q.defer(),
                    refNum = Object.keys(refs).length,
                    indicator = _opt.indicator || '&',
                    currentRefs = angular.extend({}, refs),
                    waitUntil = new snippet.WaitUntil(refNum, function () {
                        def.resolve(res)
                    });

                for (var key in refs) {
                    onGoingRef[key] = false;
                }

                function iterate() {
                    currentRefs = snippet.replaceParamsInObj(currentRefs, params);
                    for (var key in onGoingRef) {
                        if (onGoingRef.hasOwnProperty(key) && currentRefs[key].indexOf(indicator) === -1 && !onGoingRef[key]) {

                            onComplete[key] = new (function (key) {
                                return function (snap) {
                                    if (typeof snap.val() === 'string') {
                                        params[indicator + key] = snap.val();

                                    }
                                    res[key] = snap.val();
                                    delete onGoingRef[key];
                                    waitUntil.resolve();
                                    iterate();
                                }
                            })(key);

                            onGoingRef[key] = true;
                            ref(currentRefs[key]).once('value', onComplete[key])
                        }
                    }
                }

                iterate();
                return def.promise
            }

            return $firebase
        });


})();
