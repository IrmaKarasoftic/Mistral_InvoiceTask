(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('itemsController', function ($scope, dataService) {

        $scope.newItemRow = false;
        $scope.editOnId;
        $scope.removeOnId;

        $scope.newItem = {
            id: 0,
            description: "",
            quantity: 0,
            unitPrice: "",
            isDeleted: false
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
                    alert("Item created");
                }
                else
                    alert("Error");
                $scope.hideNewItemRow();
                $scope.loadItemsInfo();
            })
        }

        $scope.updateItem = function () {
            dataService.update("items", $scope.newItem.id, $scope.newItem, function (data) {
                if (data) {
                    alert("Item updated");
                }
                else {
                    alert("error");
                }
                $scope.editOff();
            })
        }

        $scope.removeItem = function () {
            $scope.newItem.isDeleted = true;
            dataService.update("items", $scope.newItem.id,$scope.newItem, function (data) {
                if (data) {
                    alert("Item removed");
                }
                else {
                    alert("error");
                    $scope.removeOff();
                }
                $scope.removeOff();
                $scope.loadItemsInfo();
            })
        }

        $scope.showNewItemRow = function (){
            $scope.newItemRow = true;
            $scope.editOff();
            $scope.removeOff();
        }

        $scope.hideNewItemRow = function () {
            $scope.newItemRow = false;
            $scope.newItem = null;
        }

        $scope.editOn = function (item) {
            $scope.removeOff();
            $scope.hideNewItemRow();
            $scope.editOnId = item.id;
            $scope.newItem = item;
        }


        $scope.editOff = function () {
            $scope.editOnId = null;
            $scope.newItem = null;
            $scope.loadItemsInfo();
        }

        $scope.checkEdit = function (item) {
            return $scope.editOnId === item.id;
        }

        $scope.removeOn = function (item) {
            $scope.hideNewItemRow();
            $scope.editOff();
            $scope.removeOnId = item.id;
            $scope.newItem = item;
        }
        $scope.removeOff = function () {
            $scope.removeOnId = null;
            $scope.newItem = null;
        }
        $scope.checkRemove = function (item) {
            return $scope.removeOnId === item.id;
        }

        $scope.checkActions = function (item) {
            return $scope.checkEdit(item) || $scope.checkRemove(item);
        }


        $scope.loadItemsInfo();

    });
}());