(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('newCustomerController', function ($scope, dataService) {
        
        $scope.newCustomer = {
            id: 0,
            name: "",
            company: 0,
            companyName: "",
            streetAddress: "",
            city: "",
            zipCode: 0,
            phoneNumber:""
        }

        $scope.loadCustomersInfo = function () {
            dataService.list("customers", function (data) {
                if (data) {
                    $scope.customers = data;
                }
                else {
                    alert("error");
                }
            })
        };

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
            dataService.update("customers", $scope.newCustomer.id, $scope.newCustomer, function (data) {
                $scope.editOff();
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