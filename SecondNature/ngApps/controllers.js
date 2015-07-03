(function () {

    angular.module('SNApp').controller('MasterController', function (PROD_API, $resource, $location) {
        var self = this;

        var Product = $resource(PROD_API);
        self.products = Product.query();

        self.myInterval = 3000;
        self.slides = [{ image: 'http://placekitten.com/603/300'}, { image: 'http://placekitten.com/602/300'}, { image: 'http://placekitten.com/602/300'}];

    });

    angular.module('SNApp').controller('ListController', function (PROD_API, $resource, $location) {
        var self = this;

        var Product = $resource(PROD_API);
        self.products = Product.query();

        self.reveal = false;

        // query products list
        var Product = $resource(PROD_API);
        Product.query().$promise.then(function (data) {
            // on success; / back from the server
            self.reveal = true;
            self.products = data;
        },
        function () {
            // on error
            console.log("error");
        });

    });

    angular.module('SNApp').controller('AddController', function (PROD_API, $resource, $routeParams, $location) {
        var self = this;

        var Product = $resource(PROD_API);
        self.add = function () {
            var newProduct = new Product(self.newProduct);
            newProduct.$save(function () {
                $location.path('/list');
            });
        }
    });

    angular.module('SNApp').controller('DetailsController', function (PROD_API, $resource, $routeParams, $location) {
        var self = this;

        var Product = $resource(PROD_API);
        self.product = Product.get({ id: $routeParams.id });
    });

    angular.module('SNApp').controller('EditController', function (PROD_API, $resource, $routeParams, $location) {
        var self = this;

        var Product = $resource(PROD_API);
        self.product = Product.get({ id: $routeParams.id });

        self.edit = function () {
            self.product.$save(function () {
                $location.path('/list');
            });
        }
    });

    angular.module('SNApp').controller('DeleteController', function (PROD_API, $resource, $routeParams, $location) {
        var self = this;
        var Product = $resource(PROD_API);
        self.product = Product.get({ id: $routeParams.id });

        self.remove = function () {
            Product.remove({ id: self.product.id }).$promise.then(function () {
                $location.path('/list');
            }, function () {
                //alert(['Product deletion failed.'])
            });
        }

        self.redirect = function () {
            $location.path('/list');
        }
    });

    angular.module('SNApp').controller('LoginController', function ($location, $http) {
        var self = this;
        self.login = function () {
            var data = "grant_type=password&username=" + self.loginEmail + "&password=" + self.loginPassword;


            $http.post('/Token', data,
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (result) {
                sessionStorage.setItem('userToken', result.access_token);
                $http.defaults.headers.common['Authorization'] = 'bearer ' + result.access_token;
                $http.get('/api/account/getisadmin').success(function (isAdmin) {
                    debugger;
                })
                $location.path('/');
            });
        }
    });

    angular.module('SNApp').controller('MenuController', function ($location, $http) {
        var self = this;

        self.showLogin = function () {
            return sessionStorage.getItem('userToken');
        };

        self.logout = function () {
            sessionStorage.removeItem('userToken');
            $location.path('/');
        };

    });

})();

