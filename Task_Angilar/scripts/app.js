(function(){
    var taskAngular = angular.module('taskAngular', ['ngRoute']);

        taskAngular.config(function ($routeProvider) {

            $routeProvider
                .when("/home", {
                    templateUrl: "views/home.html",
                    controller: "homeController"
                })
                .when("/invoices", {
                    templateUrl: "views/invoices.html",
                    controller: "invoicesController"
                })
                .when("/customers", {
                    templateUrl: "views/customers.html",
                    controller: "customersController"
                })
                .otherwise({ redirectTo: "/home" });
        })
    /*
    .run(function ($rootScope, $location) {
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (!authenticated) {
                    if (next.templateUrl != "views/login.html")
                        $location.path("/login");
                }
            })
        });
   */
    
}());