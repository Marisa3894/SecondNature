(function () {

    angular.module('SNApp').controller('MasterController', function (PROD_API, $resource, $location) {
        var self = this;

        self.myInterval = 3000;
        self.slides = [{ image: 'http://placekitten.com/603/300' }, { image: 'http://placekitten.com/602/300' }, { image: 'http://placekitten.com/602/300' }];

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

    angular.module('SNApp').controller('AddController', function (PROD_API, $resource, $location) {
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
                    if (isAdmin) {
                        sessionStorage.setItem('isAdmin', 'true')
                    }
                })
                $location.path('/');
            });
        }
    });

    angular.module('SNApp').controller('RegisterController', function ($http) {
        var self = this;

        self.register = function () {
            $http.post('/api/account/register', self.newUser).success(function () {
                $location.path('/');
            });
        };
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

    angular.module('SNApp').controller('TestController', function (PRODT_API, $location, $resource) {
        var self = this;

        var ProductToo = $resource(PRODT_API);
        self.add = function () {
            var newProductToo = new ProductToo(self.newProductToo);
            newProductToo.$save(function () {
                $location.path('/');
            });
        }

        self.today = function () {
            self.intake = new Date();
        };
        self.today();

        self.clear = function () {
            self.intake = null;
        };

         //Disable weekend selection
        self.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        self.toggleMin = function () {
            self.minDate = self.minDate ? null : new Date();
        };
        self.toggleMin();

        self.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            self.opened = true;
        };

        self.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        self.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        self.format = self.formats[0];

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        self.events =
          [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
          ];

        self.getDayClass = function (date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < self.events.length; i++) {
                    var currentDay = new Date(self.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return self.events[i].status;
                    }
                }
            }

            return '';
        };
    });
})();