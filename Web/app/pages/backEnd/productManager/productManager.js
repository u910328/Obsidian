(function (angular) {

    var app = angular.module('pages.backEnd.productManager', []);

    app.controller('ProductManager', /*@ngInject*/ function ($scope, $firebaseArray, $firebaseObject, customFn, $firebase, snippet, $errorHandler) {

        //to add/remove new products
        $scope.products=$firebaseObject($firebase.ref('products'));
        $scope.addOpt=function(){
            var arr=$scope.selectedProduct.options;
            $scope.selectedProduct.options[arr.length]=''
        };
        $scope.removeOpt=function(){
            var arr=$scope.selectedProduct.options;
            if(arr.length===0) return;
            $scope.selectedProduct.options.pop();
        };
        $scope.selectProduct=function(productId){
            $scope.selectedProduct={};
            $scope.selectedProduct=angular.extend({},$scope.products[productId]);
            $scope.selectedProduct.options=$scope.selectedProduct.options||[]
        };
        $scope.updateProduct=function(){
            $scope.products[$scope.selectedProduct.itemId]=$scope.selectedProduct;
            $scope.products.$save();
            $scope.selectedProduct={};
        };
        $scope.removeProduct=function(id){
            $scope.products[id]=null;
            $scope.products.$save();
        };
        $scope.createProduct=function(){
            var randomId=(new Date()).getTime().toString(36);
            $scope.selectedProduct={
                itemId:randomId,
                itemName:'',
                image:'',
                description:'',
                listPrice:'',
                price:'',
                options:['']
            }
        };
        $scope.clearProduct=function(){
            $scope.selectedProduct={}
        }
    });



})(angular);

