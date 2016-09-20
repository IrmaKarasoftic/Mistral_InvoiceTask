(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('newInvoiceController', function ($scope, dataService) {

        $scope.currentDate = new Date();
        $scope.currentDate.toJSON();
        $scope.customerName;
        $scope.customerID;

        $scope.newInvoice = {
            "date": "",
            "items": [],
            "status": "issued",
            "customer": 0,
            "customerName": "",
            "billTo": {},
            "shipTo": {},
        }

        $scope.from = {
            "companyName": "XYZ",
            "streetAddress": "Somewhere",
            "city": "OfSomewhere",
            "zipCode": 79209,
            "phoneNumber": "5555-555-555-555"
        }

        $scope.selectedItem = {
            id: 0,
            description: "",
            quantity: 0,
            unitPrice: ""
        }

        $scope.listExists = false;
        $scope.isInList = false;
        $scope.itemList = [];
        $scope.purchasedQuantity = [];

        $scope.billTo = false;
        $scope.shipTo = false;

        $scope.copyDataToNewItem = function(){
            $scope.newInvoice.date = $scope.currentDate;
            $scope.newInvoice.customerName ="";
            for (var i = 0; i < $scope.itemList.length; i += 1) {
                $scope.newInvoice.items.push({
                    description : $scope.itemList[i].description,
                    quantity : $scope.purchasedQuantity[i],
                    invoiceId : 0,
                    itemId : $scope.itemList[i].id,
                    price : $scope.itemList[i].unitPrice
                });
            }
            $scope.newInvoice.billTo = $scope.selectedCustomerBillTo;
            $scope.newInvoice.shipTo = $scope.selectedCustomerShipTo;
            console.log($scope.newInvoice);
        }

        $scope.createNewInvoice = function () {
            $scope.copyDataToNewItem();

        }

        $scope.loadItemsInfo = function () {
            dataService.list("items", function (data) {
                if (data) {
                    //console.log(data);
                    $scope.items = data;
                   // $scope.pqty = Array.apply(null, { length: $scope.items.length }).map(function () { return 0; });
                }
                else {
                    alert("error");
                }
            })
        };

        $scope.loadCustomersInfoBillTo = function () {
            dataService.list("customers", function (data) {
                if (data) {
                    //console.log(data);
                    $scope.customers = data;
                }
                else {
                    alert("error");
                }
            })
            $scope.billTo = true;
            $scope.shipTo = false;
        };

        $scope.loadCustomersInfoShipTo = function () {
            dataService.list("customers", function (data) {
                if (data) {
                    //console.log(data);
                    $scope.customers = data;
                }
                else {
                    alert("error");
                }
            })
            $scope.shipTo = true;
            $scope.billTo = false;
        };

        $scope.customerTransferBillTo = function (customer) {
            $scope.selectedCustomerBillTo = customer;
            $scope.selectedCustomerShipTo = customer;
        };
        $scope.customerTransferShipTo = function (customer) {
            $scope.selectedCustomerShipTo = customer;
        };

        $scope.pushToItemList = function () {
            if (!$scope.listExists)
                $scope.listExists = true;
            for (var i = 0; i < $scope.itemList.length; i += 1)
                if ($scope.selectedItem === $scope.itemList[i]){
                    $scope.isInList = true;
                    $scope.purchasedQuantity[i] += 1;
                }
            if (!$scope.isInList) {
                if ($scope.selectedItem !== null) {
                    $scope.itemList.push($scope.selectedItem);
                    $scope.purchasedQuantity.push(1);
                }
            }
            $scope.isInList = false;
            $scope.selectedItem = null;
            $scope.calculateFinal();
        }

        $scope.removeFromItemList = function (item) {
            for (var i = 0; i < $scope.itemList.length; i += 1)
                if (item === $scope.itemList[i])
                {
                    $scope.itemList.splice(i, 1);
                    $scope.purchasedQuantity.splice(i, 1);
                }
            if ($scope.itemList.length === 0)
                $scope.listExists = false;
            $scope.calculateFinal();
        }

        $scope.calculateFinal = function () {

            $scope.subTotal = 0;
            $scope.total = 0;
            $scope.taxRate = 0.17;
            $scope.tax = 0;
            for (var i = 0; i < $scope.itemList.length; i+=1)
                $scope.subTotal = $scope.subTotal + $scope.purchasedQuantity[i] * $scope.itemList[i].unitPrice;
            $scope.tax = $scope.subTotal * $scope.taxRate;
            $scope.total = $scope.subTotal + $scope.tax;
        }

        $scope.loadItemsInfo();
    });
}());