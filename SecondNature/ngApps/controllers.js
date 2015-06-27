(function () {

    angular.module('SNApp').controller('ProductListController', function (PROD_API, $resource) {
        var self = this;

        var Product = $resource(PROD_API);

        self.products = Product.query();

    });

    angular.module('SNApp').controller('DetailsController', function (PROD_API, $resource, $routeParams) {
        var self = this;

        var Product = $resource(PROD_API);

        self.product = Product.get({ id: $routeParams.id });

    });
})();