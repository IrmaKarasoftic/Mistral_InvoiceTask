(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('homeController', function ($scope, dataService) {
    
        $scope.income = [];

        $scope.years = [
            {year: 2013},
            {year: 2014},
            {year: 2015},
            {year: 2016},
        ]

        $scope.loadIncome = function () {
            for (var i = 0; i < $scope.years.length; i += 1)
            {
                dataService.create("invoiceItems", $scope.years[i]+"/aa", function (data) {
                    if (data) {
                        $scope.income.push(data);
                    }
                    else {
                        alert("error");
                    }
                })
            }
        };

        $scope.loadIncome();
        console.log($scope.income);

    });
}());