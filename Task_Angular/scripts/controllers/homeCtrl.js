(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('homeController', function ($scope, dataService) {
    
        $scope.income = [];

        $scope.years = ["2013", "2014", "2015", "2016"];

        $scope.loadIncome = function () {
            for (var i = 0; i < $scope.years.length; i += 1)
            {
                dataService.read("invoiceItems", $scope.years[i]+"/aa", function (data) {
                    if (data) {
                        $scope.income.push({
                            year: $scope.years[i],
                            incomeData : data
                        });
                    }
                    else {
                        alert("error");
                    }
                })
            }
        };

        $scope.loadIncome();

    });
}());