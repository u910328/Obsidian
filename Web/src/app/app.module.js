(function() {
    'use strict';

    angular
        .module('app', [
            'obsidian',
            'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngMaterial',
            'ui.router', 'pascalprecht.translate', 'LocalStorageModule', 'googlechart', 'chart.js', 'linkify', 'ui.calendar', 'angularMoment', 'textAngular', 'uiGmapgoogle-maps', 'hljs', 'md.data.table', angularDragula(angular),
            //'seed-module',
            // uncomment above to activate the example seed module
            'app.examples',
            'app.plugins.ngcart'
        ])
        // version of this seed app is compatible with angularFire 1.0.0
        // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
        .constant('version', '2.2.0')
        // create a constant for languages so they can be added to both obsidian & translate
        .constant('APP_LANGUAGES', [{
            name: 'LANGUAGES.CHINESE',
            key: 'zh'
        },{
            name: 'LANGUAGES.ENGLISH',
            key: 'en'
        },{
            name: 'LANGUAGES.FRENCH',
            key: 'fr'
        },{
            name: 'LANGUAGES.PORTUGUESE',
            key: 'pt'
        }])
        // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            'url':  'http://triangular-api.oxygenna.com/'
        })
        // where to redirect users if they need to authenticate (see security.js)
        .constant('loginRedirectState', 'authentication.login')


        // your Firebase data URL goes here, no trailing slash
        .constant('FBURL', 'https://lauchbox.firebaseio.com')
        .constant('config', {
            debug: true,
            shipping: 0,
            taxRate: 0,
            home:'obsidian.admin-default.dashboard-analytics'
        });
})();
