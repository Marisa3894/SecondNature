(function () {

    angular.module('SNApp', ['ngResource', 'ngRoute', 'ui.bootstrap'])
        .constant('PROD_API', '/api/products/:id')
        .config(function ($routeProvider, $locationProvider) {

        $routeProvider
        // master homepage
             .when('/', {
                 templateUrl: '/ngViews/master.html',
                 controller: 'MasterController',
                 controllerAs: 'main'
             })

            .when('/master', {
                templateUrl: '/ngViews/master.html',
                controller: 'MasterController',
                controllerAs: 'main'
            })

            .when('/zabouton', {
                templateUrl: '/ngViews/zabouton.html',
                controller: 'MasterController',
                controllerAs: 'main'
            })

            .when('/fabric', {
                templateUrl: '/ngViews/fabric.html',
                controller: 'MasterController',
                controllerAs: 'main'
            })

            .when('/neckroll', {
                templateUrl: '/ngViews/neckroll.html',
                controller: 'MasterController',
                controllerAs: 'main'
            })

            .when('/zafu', {
                templateUrl: '/ngViews/zafu.html',
                controller: 'MasterController',
                controllerAs: 'main'
            })




        // product CRUD pages
            .when('/list', {
                templateUrl: '/ngViews/list.html',
                controller: 'ListController',
                controllerAs: 'main'
            })

            .when('/add', {
                templateUrl: '/ngViews/add.html',
                controller: 'AddController',
                controllerAs: 'main'
            })

            .when('/details/:id', {
                templateUrl: '/ngViews/details.html',
                controller: 'DetailsController',
                controllerAs: 'main'
            })

            .when('/edit/:id', {
                templateUrl: '/ngViews/edit.html',
                controller: 'EditController',
                controllerAs: 'main'
            })

            .when('/delete/:id', {
                templateUrl: '/ngViews/delete.html',
                controller: 'DeleteController',
                controllerAs: 'main'
            })

        // user access
            .when('/login', {
                templateUrl: '/ngViews/login.html',
                controller: 'LoginController',
                controllerAs: 'main'
            })

            .when('/register', {
                templateUrl: '/ngViews/register.html',
                controller: 'RegisterController',
                controllerAs: 'main'
            })

            // modal
            .when('/modal', {
                templateUrl: '/ngViews/modal.html',
                controller: 'ModalController',
                controllerAs: 'main'
            })

        .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(true);

    });

})();