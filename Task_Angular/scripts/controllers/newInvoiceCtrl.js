(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('newInvoiceController', function ($scope, dataService) {

        $scope.loadItemsInfo = function () {
            dataService.list("items", function (data) {
                if (data) {
                    //console.log(data);
                    $scope.items = data;
                }
                else {
                    alert("error");
                }
            })
        };

        $scope.loadCustomersInfo = function () {
            dataService.list("customers", function (data) {
                if (data) {
                    //console.log(data);
                    $scope.customers = data;
                }
                else {
                    alert("error");
                }
            })
        };

       $scope.loadItemsInfo();
       $scope.loadCustomersInfo();

    });
}());