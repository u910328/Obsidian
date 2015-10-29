(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(obSettingsProvider, APP_LANGUAGES) {
        // set app name & logo (used in loader, sidemenu, login pages, etc)
        obSettingsProvider.setName('obsidian');
        obSettingsProvider.setLogo('assets/images/logo.png');
        // set current version of app (shown in footer)
        obSettingsProvider.setVersion('2.2.0');

        // setup available languages in obsidian
        for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
            obSettingsProvider.addLanguage({
                name: APP_LANGUAGES[lang].name,
                key: APP_LANGUAGES[lang].key
            });
        }
    }
})();
