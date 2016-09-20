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
            $scope.editCustomer = $.extend(true, {}, customer);
        };

        $scope.newCustomer = {
            id: 0,
            name: "",
            company: 0,
            companyName: "",
            streetAddress: "",
            city: "",
            zipCode: 0,
            phoneNumber: ""
        }



        $scope.createNewCustomer = function () {
            //if ($scope.newCustomer)
            dataService.create("customers", $scope.newCustomer, function (data) {
                if (data) {
                    alert("Customer created");
                }
                else
                    alert("error");
            })
        }


        $scope.updateCustomer = function () {
            dataService.update("customers", $scope.editCustomer.id, $scope.editCustomer, function (data) {
                $scope.loadCustomersInfo();
                if (data) {
                    alert("Customer updated");
                }
                else {
                    alert("error");
                }
            })
        }

        $scope.removeCustomer = function () {
            dataService.remove("customers", $scope.newCustomer.id, function (data) {
                if (data) {
                    alert("Customer removed");
                }
                else {
                    alert("error");
                }
            })
        }

        $scope.loadCustomersInfo();

    });
}());
