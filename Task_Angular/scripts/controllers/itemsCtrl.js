(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('ItemsController', function ($scope, dataService) {

        $scope.newItemRow = false;

        $scope.newItem = {
            description: "",
            quantity: 0,
            unitPrice: ""
        }

        $scope.loadItemsInfo = function () {
            dataService.list("items", function (data) {
                if (data) {
                    $scope.items = data;
                }
                else {
                    alert("error");
                }
            })
        };

        $scope.createNewItem = function () {
            if($scope.newItem)
            dataService.create("items", $scope.newItem, function (data) {
                if (data)
                {
                    $scope.hideNewItemRow();
                    alert("item created");
                }
                else
                    alert("error");
            })
        }

        $scope.showNewItemRow = function (){
            $scope.newItemRow = true;
        }

        $scope.hideNewItemRow = function () {
            $scope.newItemRow = false;
        }

        $scope.loadItemsInfo();

    });
}());