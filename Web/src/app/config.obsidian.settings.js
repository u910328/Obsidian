(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(obSettingsProvider, APP_LANGUAGES) {
        var now = new Date();
        // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
        obSettingsProvider.setName('obsidian');
        obSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' BYH');
        obSettingsProvider.setLogo('assets/images/logo.png');
        // set current version of app (shown in footer)
        obSettingsProvider.setVersion('2.0.1');

        // setup available languages in obsidian
        for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
            obSettingsProvider.addLanguage({
                name: APP_LANGUAGES[lang].name,
                key: APP_LANGUAGES[lang].key
            });
        }
    }
})();
