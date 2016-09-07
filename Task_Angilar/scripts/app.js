(function(){
    var taskAngular = angular.module('taskAngular', ['ngRoute']);

        taskAngular.config(function ($routeProvider) {

            $routeProvider
                .when("/home", { templateUrl: "views/home.html", controller: "homeController" })
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