(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('invoicesController', function ($scope, dataService) {

        $scope.subTotal = 0;
        $scope.total = 0;
        $scope.taxRate = 0.17;
        $scope.tax = 0;
        
        $scope.requestedInvoice;
        $scope.editOnId;
        $scope.removeOnId;

        $scope.statusTypes = [
            { name: "Draft", value: 0 },
            { name: "Issued", value: 1 },
            { name: "Paid", value: 2 },
            { name: "Cancelled", value: 3 }
        ]


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


        $scope.removeInvoice = function () {
            $scope.requestedInvoice.isDeleted = true;
            dataService.update("invoices", $scope.requestedInvoice.id, $scope.requestedInvoice, function (data) {
                if (data) {
                    alert("invoice updated");
                    $scope.loadInvoicesInfo();
                }
                else
                    alert("Error");
            })
        }

        $scope.updateInvoice = function () {
            dataService.update("invoices", $scope.requestedInvoice.id, $scope.requestedInvoice, function (data) {
                if (data) {
                    alert("invoice updated");
                }
                else
                    alert("Error");
                $scope.editOff();
            })
        }


        $scope.calculateValues = function (invoice) {
            $scope.subTotal = 0;
            $scope.total = 0;
            $scope.tax = 0;
            for (var i = 0; i<invoice.items.length; i++)
            {
                $scope.subTotal = $scope.subTotal + invoice.items[i].quantity * invoice.items[i].price;
            }
            $scope.tax = $scope.subTotal * $scope.taxRate;
            $scope.total = $scope.subTotal + $scope.tax;
        }

        //for modal
        $scope.invoiceTransfer = function (invoice) {
            $scope.requestedInvoice = invoice;
            $scope.calculateValues($scope.requestedInvoice);
        };

        $scope.editOn = function (invoice) {
            $scope.removeOff();
            $scope.editOnId = invoice.id;
            $scope.requestedInvoice = invoice;
        }


        $scope.editOff = function () {
            $scope.editOnId = null;
            $scope.requestedInvoice = null;
            $scope.loadInvoicesInfo();
        }

        $scope.checkEdit = function (invoice) {
            return $scope.editOnId === invoice.id;
        }

        $scope.removeOn = function (invoice) {
            $scope.editOff();
            $scope.removeOnId = invoice.id;
            $scope.requestedInvoice = invoice;
        }
        $scope.removeOff = function () {
            $scope.removeOnId = null;
            $scope.requestedInvoice = null;
        }
        $scope.checkRemove = function (invoice) {
            return $scope.removeOnId === invoice.id;
        }

        $scope.checkActions = function (invoice) {
            return $scope.checkEdit(invoice) || $scope.checkRemove(invoice);
        }

        $scope.loadInvoicesInfo();
        

    });
}());