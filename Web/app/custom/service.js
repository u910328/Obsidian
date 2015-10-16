(function () {
    //Step 1: name the new module or use a random id.
    var mod = obsidian.module('custom.services', []);


//Step 2: replace 'serviceSeed' by the factory name you like.
    mod.factory('customFn', ['FBURL', 'config', 'fbutil', '$firebaseObject', '$q', 'snippet', function (FBURL, config, fbutil, $firebaseObject, $q, snippet) {
        var customFn = {};
        return customFn
    }]);
})();

