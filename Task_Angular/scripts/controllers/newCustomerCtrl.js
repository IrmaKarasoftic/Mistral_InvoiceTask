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
        
        $scope.createNewCustomer = function () {
                dataService.create("customers", $scope.newCustomer, function (data) {
                    if (data) {
                        alert("customer created");
                    }
                    else
                        alert("error");
                })
        }
        
  

/*
        $scope.updateCustomer = function () {
            dataService.update("customers", $scope.newCustomer.id, $scope.newCustomer, function (data) {
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
        */

        $scope.loadCustomersInfo();

    });
}());