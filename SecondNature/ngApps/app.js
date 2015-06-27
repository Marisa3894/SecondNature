(function () {

    angular.module('SNApp', ['ngResource', 'ngRoute', 'ui.bootstrap']).constant('PROD_API', '/api/Products').config(function ($routeProvider, $locationProvider) {

    $routeProvider
         .when('/', {
             templateUrl: '/ngViews/master.html',
             controller: 'ProductListController',
             controllerAs: 'main'
         })
        .when('/master', {
            templateUrl: '/ngViews/master.html',
            controller: 'ProductListController',
            controllerAs: 'main'
        })
        .when('/details/:id', {
            templateUrl: '/ngViews/details.html',
            controller: 'DetailsController',
            controllerAs: 'main'
        });

    $locationProvider.html5Mode(true);

});


})();