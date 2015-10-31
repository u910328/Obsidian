(function() {
    'use strict';

    angular
        .module('obsidian', [
            'ngMaterial',
            'obsidian.layouts', 'obsidian.components', 'obsidian.themes', 'obsidian.directives',
            // 'obsidian.profiler',
            // uncomment above to activate the speed profiler
            'ui.router'
        ]);
})();