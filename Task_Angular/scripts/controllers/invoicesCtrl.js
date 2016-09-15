(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('invoicesController', function ($scope, dataService) {

        $scope.subtotal = function (invoice) {
            console.log(invoice);
            var subtotal;
            for (var i = 0; invoice.items.length; i++)
            {
                var item = invoice.items[i];
                subtotal = subtotal + item.unitPrice * item.quantity;
               
            }
            console.log(subtotal);
            return subtotal;
        }

        $scope.loadInvoicesInfo = function () {
            dataService.list("invoices", function (data) {
                if (data) {
                    console.log(data);
                    $scope.invoices = data;
                } else {
                    alert("error");
                }
            });
        };

        $scope.invoiceTransfer = function (invoice) {
                $scope.requestedInvoice = invoice;
                console.log($scope.requestedInvoice);
        }

        $scope.loadInvoicesInfo();

    });
}());