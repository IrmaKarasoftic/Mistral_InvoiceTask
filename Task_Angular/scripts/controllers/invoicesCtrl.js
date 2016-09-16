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

        $scope.loadInvoicesInfo();

    });
}());