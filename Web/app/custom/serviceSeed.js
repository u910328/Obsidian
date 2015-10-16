(function () {
    //Step 1: name the new module.
    var mod = obsidian.module('customServiceSeed', []);

//Step 2: replace 'serviceSeed' by the factory name you like.
    mod.factory('serviceSeed', ['FBURL', 'config', 'fbutil', '$firebaseObject', '$q', 'snippet', function (FBURL, config, fbutil, $firebaseObject, $q, snippet) {
        //start here
    }]);

})();
