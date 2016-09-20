(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('invoicesController', function ($scope, dataService) {

        $scope.subTotal = 0;
        $scope.total = 0;
        $scope.taxRate = 0.17;
        $scope.tax = 0;

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


        $scope.calculateValues = function (invoice) {
            for (var i = 0; i<invoice.items.length; i++)
            {
                $scope.subTotal = $scope.subTotal + invoice.items[i].quantity * invoice.items[i].price;
            }
            $scope.tax = $scope.subTotal * $scope.taxRate;
            $scope.total = $scope.subTotal + $scope.tax;
        }


        $scope.invoiceTransfer = function (invoice) {
            $scope.requestedInvoice = invoice;
            $scope.calculateValues($scope.requestedInvoice);
        };

        $scope.loadInvoicesInfo();
        

    });
}());