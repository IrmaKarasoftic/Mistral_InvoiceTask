(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('newInvoiceController', function ($scope, dataService) {

        $scope.from = {
            "companyName": "XYZ",
            "streetAddress": "Somewhere",
            "city": "OfSomewhere",
            "zipCode": 79209,
            "phoneNumber": "5555-555-555-555"
        }

        $scope.billTo = false;
        $scope.shipTo = false;

        $scope.loadItemsInfo = function () {
            dataService.list("items", function (data) {
                if (data) {
                    //console.log(data);
                    $scope.items = data;
                    $scope.pqty = Array.apply(null, { length: $scope.items.length }).map(function () { return 0; });
                }
                else {
                    alert("error");
                }
            })
        };

        $scope.loadCustomersInfoBillTo = function () {
            dataService.list("customers", function (data) {
                if (data) {
                    //console.log(data);
                    $scope.customers = data;
                }
                else {
                    alert("error");
                }
            })
            $scope.billTo = true;
            $scope.shipTo = false;
        };

        $scope.loadCustomersInfoShipTo = function () {
            dataService.list("customers", function (data) {
                if (data) {
                    //console.log(data);
                    $scope.customers = data;
                }
                else {
                    alert("error");
                }
            })
            $scope.shipTo = true;
            $scope.billTo = false;
        };

        $scope.customerTransferBillTo = function (customer) {
            $scope.selectedCustomerBillTo = customer;
            $scope.selectedCustomerShipTo = customer;
        };
        $scope.customerTransferShipTo = function (customer) {
            $scope.selectedCustomerShipTo = customer;
        };


        $scope.loadItemsInfo();


    });
}());