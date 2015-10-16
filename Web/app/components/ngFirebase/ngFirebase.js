(function (angular) {
    'use strict';
    var mod = obsidian.module('ngFirebase', []);

    mod.directive('ngFirebase', ['$firebase', function ($firebase) {
        return {
            restrict: 'A',
            transclude: true,
            scope: {
                ngFirebase: '@',
                loading: '@'
            },
            link: function (scope, element, attrs, ctrl, transcludeFn) {
                function init() {
                    var obj = $firebase.$object(scope.ngFirebase);
                    element.append(scope.loading);
                    obj.$loaded(appendTransclude, appendTransclude);

                    var valueAs = attrs.valueAs || '$value',
                        errorAs = attrs.errorAs || '$error';

                    function appendTransclude(dataOrError) {
                        element.empty();
                        transcludeFn(function (clone, trclScope) {
                            element.append(clone);
                            if (dataOrError === obj) {
                                if (attrs.pure) {
                                    var pureValue = {};
                                    angular.forEach(dataOrError, function (subValue, key) {
                                        pureValue[key] = subValue
                                    });
                                    trclScope[valueAs] = dataOrError.$value ? dataOrError.$value : pureValue;
                                } else {
                                    trclScope[valueAs] = dataOrError.$value ? dataOrError.$value : dataOrError;
                                }
                                trclScope.$firebaseObject = dataOrError;
                                trclScope.$eval(attrs.loaded);
                            } else {
                                trclScope[errorAs] = dataOrError;
                                obj.$destroy();
                            }
                        })
                    }
                }

                scope.$watch('ngFirebase', function () {
                    if ($firebase.isRefUrlValid(scope.ngFirebase)) init();
                });
            }

        };
    }]);
})(angular);

