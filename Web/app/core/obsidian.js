var obsidian = new (function () {
    var appDependencies = [];

    this.addResource = function (resource, type) {
        if(type===undefined||type==='jsOnly'){
            var script = document.createElement("script");
            script.src = resource.src;
            document.getElementsByTagName("body")[0].appendChild(script);
        }

        if (resource.css&&(type===undefined||type==='cssOnly')) {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = resource.css;
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    };

    this.module = function (name, dependencies) {
        if (appDependencies.indexOf(name) === -1) {
            appDependencies.push(name);
        }
        return dependencies? angular.module(name, dependencies): angular.module(name)
    };


    this.getAppDependencies = function () {
        return appDependencies;
    };


    this.init = function (modulePaths, opt) {
        var _opt=opt||{}, type;
        if(!opt.DEV_MODE&&_opt.BUNDLE){
            type='cssOnly';
            obsidian.addResource({src:_opt.BUNDLE});
        }
        for (var key in modulePaths) {
            if(modulePaths.hasOwnProperty(key)) obsidian.addResource(modulePaths[key], type);
        }
    };
})();