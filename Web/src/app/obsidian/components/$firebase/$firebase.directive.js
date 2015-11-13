(function () {
    'use strict';

    angular
        .module('obsidian.components')
        .directive('ngFirebase', ngFirebase)
        .directive('ngFirebaseObject', ngFirebaseObject);


    /*@ngInject*/
    function ngFirebase($firebase) {
        return {
            restrict: 'A',
            transclude: true,
            scope: {
                ngFirebase: '@',
                orderBy: '@',
                startAt: '@',
                endAt: '@',
                equalTo: '@',
                limitToFirst: '@',
                limitToLast: '@',
                options: '=',
                sync: '@',
                eventType: '@',
                callback: '='
            },
            link: function (scope, element, attrs, ctrl, transcludeFn) {
                var opt = {
                        orderBy: scope.orderBy,
                        startAt: scope.startAt,
                        endAt: scope.endAt,
                        equalTo: scope.equalTo,
                        limitToFirst: scope.limitToFirst,
                        limitToLast: scope.limitToLast
                    };

                function init(ref) {

                    var valueAs = attrs.valueAs || '$value',
                        errorAs = attrs.errorAs || '$error';

                    scope.eventType=scope.eventType===undefined? 'value': scope.eventType;
                    scope.callback=angular.isFunction(scope.callback)? scope.callback:angular.noop;


                    transcludeFn(function (clone, trclScope) {
                        element.append(clone);

                        ref[opt.sync||opt.sync===undefined? 'on' : 'once'](scope.eventType, onSuccess, onError);

                        function onSuccess(snap, prevChildKey) {
                            trclScope[valueAs]=trclScope[valueAs]? trclScope[valueAs]:{};

                            if (scope.eventType === 'value') {
                                trclScope[valueAs] = snap.val();
                            } else {
                                trclScope[valueAs][snap.key()] = snap.val();
                            }
                            scope.callback(snap, prevChildKey);
                        }
                        function onError(error) {
                            scope[errorAs] = error;
                        }
                    });
                }

                scope.$watch('ngFirebase', function () {
                    var ref = $firebase.ref(scope.ngFirebase, scope.options || opt);
                    init(ref);
                });
            }

        };
    }

    /*@ngInject*/
    function ngFirebaseObject($firebase) {
        return {
            restrict: 'A',
            transclude: true,
            scope: {
                ngFirebaseObject: '@',
                loading: '@'
            },
            link: function (scope, element, attrs, ctrl, transcludeFn) {
                function init(obj) {
                    element.append(scope.loading);
                    obj.$loaded(appendTransclude, appendTransclude);

                    var valueAs = attrs.valueAs || '$value',
                        errorAs = attrs.errorAs || '$error';

                    function appendTransclude(dataOrError) {
                        element.empty();
                        transcludeFn(function (clone, trclScope) {
                            element.append(clone);
                            if (dataOrError === obj) {
                                trclScope[valueAs] = dataOrError.$value ? dataOrError.$value : dataOrError;

                                trclScope.$firebaseObject = dataOrError;
                                trclScope.$eval(attrs.loaded);
                            } else {
                                trclScope[errorAs] = dataOrError;
                                obj.$destroy();
                            }
                        })
                    }
                }

                var obj = $firebase.$object(scope.ngFirebaseObject);
                var isInitiated = false;
                scope.$watch('ngFirebaseObject', function () {
                    if (isInitiated) {
                        obj.$destroy();
                        obj = $firebase.$object(scope.ngFirebaseObject);
                        init(obj);
                    } else {
                        init(obj);
                    }
                });
            }

        };
    }
})();
