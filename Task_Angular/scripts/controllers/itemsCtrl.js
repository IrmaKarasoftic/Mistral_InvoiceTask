(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('itemsController', function ($scope, dataService) {

        $scope.newItemRow = false;
        $scope.editOnId;

        $scope.newItem = {
            id: 0,
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
            dataService.create("items", $scope.newItem, function (data) {
                if (data)
                {
                    $scope.hideNewItemRow();
                    alert("Item created");
                }
                else
                    alert("Error");
            })
        }

        $scope.updateItem = function () {
            dataService.update("items", $scope.newItem.id, $scope.newItem, function (data) {
                $scope.editOff();
                if (data) {
                    alert("Item updated");
                }
                else {
                    alert("error");
                }
            })
        }

        $scope.removeItem = function () {
            dataService.remove("items", $scope.newItem.id, function (data) {
                $scope.editOff();
                if (data) {
                    alert("Item removed");
                }
                else {
                    alert("error");
                }
            })
        }

        $scope.showNewItemRow = function (){
            $scope.newItemRow = true;
            $scope.editOff();
        }

        $scope.hideNewItemRow = function () {
            $scope.newItemRow = false;
            $scope.newItem = null;
        }

        $scope.editOn = function (item) {
            $scope.hideNewItemRow();
            $scope.editOnId = item.id;
            $scope.newItem = item;
        }


        $scope.editOff = function () {
            $scope.editOnId = null;
            $scope.newItem = null;
        }

        $scope.checkEdit = function (item) {
            return $scope.editOnId === item.id;
        }


        $scope.loadItemsInfo();

    });
}());