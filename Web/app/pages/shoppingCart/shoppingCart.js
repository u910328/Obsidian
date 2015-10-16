(function (angular) {
    "use strict";

    var state = 'shoppingCart',
        url = '/shoppingCart',
        ctrlName = 'ShoppingCartCtrl',
        templateUrl = 'pages/shoppingCart/shoppingCart.html';

    var app = obsidian.module('pages.shoppingCart', []);

    app.controller(ctrlName, /*@ngInject*/ function ($q, config, user, $scope, $rootScope, $firebase, snippet, $state, ngCart) {
        $scope.ngCart = ngCart;
        var cart = {products: {}};

        $scope.emptyCart = function () {
            ngCart.empty();  //清空購物車, ngCart 要清兩次才會清空
            ngCart.empty()
        };

        $scope.paymentMethod = 'uponPickup';
        $scope.clientEmail=$rootScope.user? $rootScope.user.email:null;
        $scope.clientPhone=$rootScope.user? $rootScope.user.phone:null;
        $scope.clientName=$rootScope.user? (user[user.provider].displayName || user[user.provider].email):null;
        $scope.uid=$rootScope.user? $rootScope.user.uid:null;




        function updateContactInfo(){
            if(!$rootScope.user) return;
            var isEmailChanged=($scope.clientEmail===$rootScope.user.email),
                isPhoneChanged=($scope.clientPhone===$rootScope.user.phone),
                uploadList=[];
            if(isEmailChanged) uploadList.push({
                refUrl:'users/' + user.uid + '/email', value: $scope.clientEmail
            });
            if(isPhoneChanged) uploadList.push({
                refUrl:'users/' + user.uid + '/phone', value: $scope.clientPhone
            });
            if(uploadList.length>0) $firebase.batchUpdate(uploadList);
        }

        if (config.debug) {
            $scope.number = '4242424242424242';
            $scope.expiry = '11/16';
            $scope.cvc = '123';
        }

        function isTimeValid() {
            if (( $scope.dt.getDay() === 0 || $scope.dt.getDay() === 6 )) {
                alert('Please pick a weekday.');
                return false
            }
            if ($scope.dt.getTime() < (new Date()).getTime() + 30 * 60 * 1000) {
                alert('Please pick a time at least 30 minutes from now.');
                return false
            } else {
                return true
            }
        }

        $scope.submitOrder = function () {
            //確保有足夠時間準備
            if (!isTimeValid()) return;

            $scope.waiting = true; //進入waiting畫面,得到token後stripeCallback會執行
            if ($scope.paymentMethod === 'uponPickup') uploadOrder('uponPickup').then(function (res) {
                var orderId = res.params['$orderId'];
                $scope.invoice.orderId = orderId;
                $state.goWithData('invoice', {orderId: orderId}, $scope.invoice); //成功後轉換至invoice頁面
                $scope.emptyCart();
                if (!$scope.$$phase) $scope.$apply(); //確保成功轉換頁面
            });
        };

        function getPaymentData(code, result) {
            $scope.payment = {};
            if (result.error) {
                window.alert('it failed! error: ' + result.error.message);
            } else {
                console.log('success! token: ' + result.id);
                $scope.payment = {
                    token: result.id,
                    provider: 'stripe'
                };
            }
        }

        $scope.stripeCallback = function (code, result) {
            if ($scope.paymentMethod === 'uponPickup' || !isTimeValid()) return;
            getPaymentData(code, result);

            //將payment provider取得的token加入其他資料一起上傳
            uploadOrder('creditCard')
                .then(function (res) {
                    var orderId = res.params['$orderId'];
                    console.log('orderId is ' + orderId);


                    clearTimeout(timeout);

                    if (res.isCharged === 'succeeded') {
                        $state.go('invoice', $scope.invoice); //成功後轉換至invoice頁面
                        console.log('transaction succeeded');
                        $scope.emptyCart();
                        if (!$scope.$$phase) $scope.$apply(); //確保成功轉換頁面
                    } else {
                        //TODO : errorHandler(errorId, 'transaction failed', res.isCharged);
                    }
                    $scope.waiting = false;


                }, function (err) {
                    console.log(JSON.stringify(err)); //上傳失敗產生警告
                });
        };

        function prepareOrderData() {
            angular.forEach(ngCart.getItems(), function (item) {
                cart.products[item._id] = item._data;
                cart.products[item._id].quantity = item._quantity;
                cart.products[item._id].itemId = item._id;
            });

            var payment = $scope.payment || {};
            payment.method = $scope.paymentMethod;

            angular.extend(cart,
                {
                    clientName: $scope.clientName,
                    clientId: $scope.uid,
                    clientEmail: $scope.clientEmail,
                    clientPhone: $scope.clientPhone,
                    createdTime: Firebase.ServerValue.TIMESTAMP,
                    note: $scope.note || null,
                    schedule: $scope.dt.getTime(),
                    orderStatus: 'received',
                    payment: payment,
                    shipment: {}//
                }
            );
        }


        function uploadOrder(type) {

            updateContactInfo();
            //整理order 資料
            prepareOrderData();

            //產生要存至主order資料庫的結構
            var mainOrderStructure = {
                clientName: '',
                clientId: '',
                clientEmail: '',
                clientPhone: '',
                createdTime: '',
                orderStatus: '',
                note: '',
                //subTotal:'',        由主機端計算，防止人為竄改。
                products: {
                    $productId: {
                        itemName: '',
                        itemId: '',
                        quantity: '',
                        price: '',
                        selectedOption: ''
                    }
                },
                payment: '',
                shipment: '',
                schedule: ''
            };

            //產生要存至主order資料庫的資料

            var mainOrderData = {
                refUrl: 'orders/$orderId',
                value: snippet.filterRawData(cart, mainOrderStructure)
            };
            //產生要存至user的order資料庫的結構
            var userOderReceiptStructure = {
                createdTime: '',
                orderStatus: '',
                note: '',
                products: {
                    $productId: {
                        itemId: '',
                        itemName: '',
                        quantity: '',
                        price: '',
                        selectedOption: ''
                    }
                },
                payment: '',
                shipment: '',
                schedule: ''
            };

            //產生要存至user的order資料庫的資料
            var userReceiptData = {
                refUrl: 'users/$uid/orderHistory/$orderId',
                value: snippet.filterRawData(cart, userOderReceiptStructure)
            };

            //放到同一個array產生批次上傳資料
            var batchOrderData = [mainOrderData, userReceiptData];

            //產生收據
            $scope.invoice = angular.extend({}, cart);

            //批次上傳
            return $firebase.$communicate({
                request: batchOrderData,
                response: type === 'uponPickup' ? false : {isCharged: 'users/$uid/orderHistory/$orderId/payment/status'}
            });
        }

        //date picker

        $scope.dt = new Date();
        $scope.hour = 12;
        $scope.minute = 0;
        $scope.minDate = $scope.dt;
        $scope.maxDate = new Date(
            $scope.dt.getFullYear(),
            $scope.dt.getMonth() + 2,
            $scope.dt.getDate());

        $scope.changeDt = function () {
            $scope.hour = 12;
            $scope.dt.setHours(12);
            $scope.minute = 0;
            $scope.dt.setMinutes(0);
        };
        $scope.changeDt();

        $scope.changeTime = function () {
            $scope.dt.setHours($scope.hour);
            $scope.dt.setMinutes($scope.minute);
        };
    });

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state(state, {
            url: url,
            templateUrl: templateUrl,
            controller: ctrlName,
            resolve: {
                user: ['Auth', function (Auth) {
                    return Auth.$waitForAuth();
                }]
            }
        });
    }]);

    app.run(/*@ngInject*/ function ($rootScope, ngCart, config) {
        ngCart.setShipping(config.shipping);
        ngCart.setTaxRate(config.taxRate);

        function refreshTotalItems() {
            $rootScope.cartTotalItems = ngCart.getTotalItems()
        }

        $rootScope.$on('ngCart:change', refreshTotalItems);
        refreshTotalItems();
    });

})(angular);