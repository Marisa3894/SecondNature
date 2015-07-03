(function () {

    angular.module('SNApp').controller('MasterController', function (PROD_API, $resource, $location) {
        var self = this;

        var Product = $resource(PROD_API);
        self.products = Product.query();

        self.myInterval = 5000;
        self.slides = [{ image: 'http://placekitten.com/603/300'}, { image: 'http://placekitten.com/602/300'}, { image: 'http://placekitten.com/602/300'}];

    });

    angular.module('SNApp').controller('ListController', function (PROD_API, $resource, $location) {
        var self = this;

        var Product = $resource(PROD_API);

        self.products = Product.query();

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

    angular.module('SNApp').controller('DetailsController', function (PROD_API, $resource, $routeParams) {
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

    //Modal - https://angular-ui.github.io/bootstrap/
    angular.module('SNApp').controller('ModalController', function ($modal, $log) {
        var self = this;

        self.items = ['item1', 'item2', 'item3'];

        self.animationsEnabled = true;

        self.open = function (size) {

            var modalInstance = $modal.open({
                animation: self.animationsEnabled,
                templateUrl: 'modal.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return self.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                self.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        self.toggleAnimation = function () {
            self.animationsEnabled = !self.animationsEnabled;
        };

    });

    // Please note that $modalInstance represents a modal window (instance) dependency.
    // It is not the same as the $modal service used above.

    angular.module('SNApp').controller('ModalInstanceCtrl', function ($modalInstance, items) {
        var self = this;

        self.items = items;
        self.selected = {
            item: self.items[0]
        };

        self.ok = function () {
            $modalInstance.close(self.selected.item);
        };

        self.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

})();

