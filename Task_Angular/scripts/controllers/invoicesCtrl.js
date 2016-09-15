(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('invoicesController', function ($scope, dataService) {


        $scope.loadInvoicesInfo = function () {
            dataService.list("invoices", function (data) {
                if (data) {
                    //console.log(data);
                    $scope.invoices = data;
                } else {
                    alert("error");
                }
            });
        };

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

        $scope.loadItemsAndCustomers = function () {
            $scope.loadItemsInfo();
            $scope.loadCustomersInfo();
        };

        $scope.invoiceTransfer = function (invoice) {
            $scope.requestedInvoice = invoice;
            //console.log($scope.requestedInvoice);
        };

        $scope.loadInvoicesInfo();

    });
}());