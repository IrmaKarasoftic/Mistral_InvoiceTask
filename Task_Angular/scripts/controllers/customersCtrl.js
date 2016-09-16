(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('customersController', function ($scope, dataService) {

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

        $scope.customerTransfer = function (customer) {
            $scope.requestedCustomer = customer;
            //console.log($scope.requestedInvoice);
        };

        $scope.loadCustomersInfo();
    });
}());
