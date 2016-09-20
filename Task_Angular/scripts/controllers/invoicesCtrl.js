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


        $scope.invoiceTransfer = function (invoice) {
            $scope.requestedInvoice = invoice;
            //console.log($scope.requestedInvoice);
        };

        calculateValues = function()
        {
            $scope.subtotal = 0;
            $scope.total = 0;
            $scope.taxRate = 0.17;
            foreach(item in invoices.items)
            {
                $scope.subtotal = $scope.subtotal + item.quantity * item.unitPrice;
            }
            $scope.tax = $scope.subtotal * $scope.taxRate;
            $scope.total = $scope.subtotal - $scope.subtotal * $scope.tax;
        }
        $scope.loadInvoicesInfo();

    });
}());