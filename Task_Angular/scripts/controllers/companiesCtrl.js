(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('companiesController', function ($scope, dataService) {
        $scope.removeOnId;

        $scope.loadCompaniesInfo = function () {
            $scope.waitCompanies = true;
            dataService.list("companies", function (data) {
                if (data) {
                    $scope.companies = data;
                    $scope.waitCompanies = false;
                }
                else {
                    alert("error");
                }
            })
            dataService.list("companies", function (data) {
                if (data) {
                    $scope.companies = data;
                }
                else {
                    alert("error");
                }
            })
        };

        $scope.companyTransfer = function (company) {
            $scope.requestedCompany = company;
            $scope.editCompany = $.extend(true, {}, company);
        };

        $scope.newCompany = {
            id: null,
            name: null,
            company: null,
            streetAddress: null,
            city: null,
            zipCode: null,
            phoneNumber: null,
            isDeleted: false
        }


        $scope.createNewCompany = function () {
            if ($scope.newCompany.name === null ||
                $scope.newCompany.streetAddress === null ||
                $scope.newCompany.city === null ||
                $scope.newCompany.zipCode === null ||
                $scope.newCompany.phoneNumber === null)
            {
                alert("All fields must be filled in.");
                return;
            }
            if (
                typeof $scope.newCompany.name === "string" ||
                typeof $scope.newCompany.streetAddress === "string" ||
                typeof $scope.newCompany.city === "string" ||
                typeof $scope.newCompany.zipCode === "number" ||
                typeof $scope.newCompany.phoneNumber === "number")
            {
                alert("Incorrect input");
                return;
            }
            dataService.create("companies", $scope.newCompany, function (data) {
                $scope.loadCompaniesInfo();
                if (data) {
                    notificationsConfig.success("Company added");
                }
                else
                    notificationsConfig.error("Adding companies failed!");
            })
        }


        $scope.updateCompany = function () {
            dataService.update("companies", $scope.editCompany.id, $scope.editCompany, function (data) {
                $scope.loadCompaniesInfo();
                if (data) {
                    notificationsConfig.success("Company updated");
                }
                else {
                    notificationsConfig.success("Company update failed");
                }
                $scope.editOff();

            })
        }

        $scope.removeCompany = function () {
            $scope.newCompany.isDeleted = true;
            dataService.update("companies", $scope.newCompany.id, $scope.newCompany, function (data) {
                $scope.loadCompaniesInfo();
                if (data) {
                    notificationsConfig.success("Company deleted");
                }
                else {
                    notificationsConfig.success("Company delete failed");
                }
            })
        }


        $scope.CompanyRemoveOn = function (company) {
            $scope.removeOnId = company.id;
            $scope.newCompany = company;
        }
        $scope.CompanyRemoveOff = function () {
            $scope.removeOnId = null;
            $scope.newCompany = null;
        }
        $scope.CompanyCheckRemove = function (company) {
            return $scope.removeOnId === company.id;
        }

        $scope.loadCompaniesInfo();


    });
}());
