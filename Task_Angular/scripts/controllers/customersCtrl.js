(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('customersController', function ($scope, dataService) {
        $scope.removeOnId;

        $scope.loadCustomersInfo = function () {
            $scope.waitCustomers = true;
            dataService.list("customers", function (data) {
                if (data) {
                    $scope.customers = data;
                    $scope.waitCustomers = false;
                }
                else {
                    alert("error");
                }
            })
            dataService.list("companies", function (data) {
                if (data) {
                    console.log(data);
                    $scope.companies = data;
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
            isDeleted : false,
            city: "",
            zipCode: 0,
            phoneNumber: ""
        }


        $scope.createNewCustomer = function () {
            //if ($scope.newCustomer)
            dataService.create("customers", $scope.newCustomer, function (data) {
                $scope.loadCustomersInfo();
                console.log($scope.newCustomer);
                if (data) {
                    notificationsConfig.success("Customer added");
                }
                else notificationsConfig.error("Adding customers failed!");
            })
        }


        $scope.updateCustomer = function () {
            dataService.update("customers", $scope.editCustomer.id, $scope.editCustomer, function (data) {
                $scope.loadCustomersInfo();
                console.log($scope.editCustomer);
                if (data) {
                    notificationsConfig.success("Customer updated");
                }
                else {
                    notificationsConfig.success("Customer update failed");
                }
            })
        }

        $scope.removeCustomer = function () {
            $scope.newCustomer.isDeleted = true;
            dataService.update("customers", $scope.newCustomer.id, $scope.newCustomer, function (data) {
                $scope.loadCustomersInfo();
                console.log($scope.newCustomer);
                if (data) {
                    notificationsConfig.success("Customer deleted");
                }
                else {
                    notificationsConfig.success("Customer delete failed");
                }
            })
        }

        $scope.CustomerRemoveOn = function (customer) {
            $scope.removeOnId = customer.id;
            $scope.newCustomer = customer;
        }
        $scope.CustomerRemoveOff = function () {
            $scope.removeOnId = null;
            $scope.newCustomer = null;
        }
        $scope.CustomerCheckRemove = function (customer) {
            return $scope.removeOnId === customer.id;
        }
       

        $scope.loadCustomersInfo();


    });
}());
    