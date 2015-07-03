(function () {
    angular.module('SNApp').factory('ProductService', function (PROD_API, $http, $resource) {
        // load products here
        var self = this;

        $http.defaults.headers.common['Authorization'] = 'bearer ' + sessionStorage.getItem('userToken');

        var Product = $resource(PROD_API);

        var _getProducts = function () {
            return Product.query();
        };

        var _getProduct = function (id) {
            return Product.get({ id: id });
        };

        var _addProduct = function (product) {
            var newProduct = new Product(product);
            return newProduct.$save();
        };

        var _editProduct = function (product) {
            return product.$save();
        };

        var _deleteProduct = function (id) {
            return Product.remove({ id: id }).$promise;
        };

        return {
            getProducts: _getProducts,
            getProduct: _getProduct,
            addProduct: _addProduct,
            editProduct: _editProduct,
            deleteProduct: _deleteProduct

        };

    });

})();