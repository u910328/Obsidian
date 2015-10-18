'use strict';

var ENV = {
    DEV_MODE: true,
    BUNDLE: 'dist/bundle.js'
};
// Declare app level module which depends on filters, and services
var modulePaths = {
    //external modules
    //angularPayments: {
    //    src: "bower_components/angular-payments/lib/angular-payments.min.js"
    //},
    //uiValidate: {
    //    src: "bower_components/angular-ui-validate/dist/validate.js"
    //},
    //bundle:{
    //    src: "dist/app.js"
    //}

    //core components
    appversion: {
        src: "components/appversion/appversion-directive.js"
    },
    errorHandler: {
        src: "components/errorHandler/error.js"
    },
    auth: {
        src: "components/auth/auth.js"
    },
    firebaseUtils: {
        src: "components/firebase.utils/firebase.utils.js"
    },
    ngcloak: {
        src: "components/ngcloak/ngcloak-decorator.js"
    },
    filters: {
        src: "components/filters/filters.js"
    },
    security: {
        src: "components/security/security.js"
    },
    ngCart: {
        src: "components/ngcart/ngCart.js"
    },
    notify: {
        src: "components/notify/notify.js",
        css: "components/notify/notify.css"
    },
    ngFirebase: {
        src: "components/ngFirebase/ngFirebase.js"
    },
    uiMask: {
        src: "components/inputMask/ui-mask.js"
    },
    socialLinks: {
        src: "components/socialLinks/socialLinks.js"
    },
    scrollpoint: {
        src: "components/scrollpoint/scrollpoint.js"
    },
    model: {
        src: "core/model.js"
    },
    snippet: {
        src: "core/snippet.js"
    },

    $firebase: {
        src: "core/$firebase.js"
    },
    linkFn: {
        src: "core/linkFn.js"
    },
    elasticSearch: {
        src: "core/elasticSearch.js"
    },
    init: {
        src: "core/init.js"
    },

    //custom
    customService: {
        src: "custom/service.js"
    },
    customFilter: {
        src: "custom/filter.js"
    },
    customDirective: {
        src: "custom/directive.js"
    },
    //pages
    login: {
        src: "pages/login/login.js"
    },
    account: {
        src: "pages/account/account.js"
    },
    productList: {
        src: "pages/productList/productList.js"
    },
    productDetail: {
        src: "pages/productDetail/productDetail.js"
    },
    home: {
        src: "pages/home/home.js"
    },
    shoppingCart: {
        src: "pages/shoppingCart/shoppingCart.js"
    },
    pageSeed: {
        src: "pages/pageSeed/pageSeed.js"
    },
    myOrders: {
        src: "pages/myOrders/myOrders.js"
    },
    backEnd: {
        src: "pages/backEnd/backEnd.js"
    },
    backEndOrders: {
        src: "pages/backEnd/orders/orders.js"
    },
    backEndProductManager: {
        src: "pages/backEnd/productManager/productManager.js"
    },
    test: {
        src: "pages/test/test.js"
    },
    test2: {
        src: "pages/test2/test2.js"
    },
    invoice: {
        src: "pages/invoice/invoice.js"
    },
    app: {
        src: "app.js"
    }
};

if (typeof module !== 'undefined' && module.exports) {module.exports = {modulePaths: modulePaths,env:ENV}} else {

    obsidian.module('myApp.config',
        [
            'firebase',
            'ngMaterial',
            'ui.router',
            'ngMessages',
            'ngAnimate',
            'ngCart',
            'ngNotify',
            'ui.mask',
            'angularPayments',
            'socialLinks',
            'ui.scrollpoint'
        ])

        // version of this seed app is compatible with angularFire 1.0.0
        // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
        .constant('version', '0.8.5')

        // where to redirect users if they need to authenticate (see security.js)
        .constant('loginRedirectState', 'login')


        // your Firebase data URL goes here, no trailing slash
        .constant('FBURL', 'https://frecome.firebaseio.com')
        .constant('config', {
            debug: true,
            shipping: 0,
            taxRate: 0
        })
        .config(/*@ngInject*/ function ($mdIconProvider, $urlRouterProvider) {
            $mdIconProvider.defaultIconSet('img/icons/sets/core-icons.svg', 24);
            $urlRouterProvider.otherwise('/home');
        })
        .config(/*@ngInject*/ function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('pink', {
                    'default': '400', // by default use shade 400 from the pink palette for primary intentions
                    'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                    'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                    'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
                })
                // If you specify less than all of the keys, it will inherit from the
                // default shades
                .accentPalette('purple', {
                    'default': '200' // use shade 200 for default, and keep all other shades the same
                });
        })

        // double check that the app has been configured before running it and blowing up space and time
        .run(/*@ngInject*/ function (FBURL, $timeout) {
            if (FBURL.match('//INSTANCE.firebaseio.com')) {
                angular.element(document.body).html('<h1>Please configure app/config.js before running!</h1>');
                $timeout(function () {
                    angular.element(document.body).removeClass('hide');
                }, 250);
            }
        });

    obsidian.init(modulePaths, ENV);



}


//
//
//window.randomString = function (length) {
//    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
//
//    if (!length) {
//        length = Math.floor(Math.random() * chars.length);
//    }
//
//    var str = '';
//    for (var i = 0; i < length; i++) {
//        str += chars[Math.floor(Math.random() * chars.length)];
//    }
//    return str;
//};


//window.module=undefined;
//if(module){
//    module.exports={
//        modulePaths:modulePaths
//    }
//}