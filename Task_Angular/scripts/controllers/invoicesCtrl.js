﻿(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('invoicesController', function ($scope, dataService) {

        $scope.hidden = true;
        $scope.subTotal = 0;
        $scope.total = 0;
        $scope.taxRate = 0.17;
        $scope.tax = 0;

        $scope.requestedInvoice;
        $scope.editOnId;
        $scope.removeOnId;

        $scope.statusTypes = [
            { name: "Draft", value: 0 },
            { name: "Issued", value: 1 },
            { name: "Paid", value: 2 },
            { name: "Cancelled", value: 3 }
        ]


        $scope.loadInvoicesInfo = function () {
            dataService.list("invoices", function (data) {
                if (data) {
                    $scope.invoices = data;
                } else {
                    notificationsConfig.success("error");
                }
            });
        };

        //$scope.loadInvoiceItems = function () {
        //    dataService.list("invoices", function (data) {
        //        if (data) {
        //            $scope.invoiceItems = data;
        //        }
        //        else {
        //            notificationsConfig.success("error");
        //        }
        //    })
        //}


        $scope.removeInvoice = function () {
            $scope.requestedInvoice.isDeleted = true;
            dataService.update("invoices", $scope.requestedInvoice.id, $scope.requestedInvoice, function (data) {
                if (data) {
                    notificationsConfig.success("invoice removed");
                    $scope.loadInvoicesInfo();
                }
                else
                    notificationsConfig.error("Error");
            })
        }

        $scope.updateInvoice = function () {
            if ($scope.newCompany.name !== null &&
                $scope.newCompany.streetAddress !== null &&
                $scope.newCompany.city !== null &&
                $scope.newCompany.zipCode !== null &&
                $scope.newCompany.phoneNumber !== null) {
                dataService.update("invoices", $scope.requestedInvoice.id, $scope.requestedInvoice, function (data) {
                    if (data) {
                        notificationsConfig.success("invoice updated");
                    }
                    else
                        notificationsConfig.error("Error");
                    $scope.editOff();
                })
            }
            else {
                notificationsConfig.error("All fields must be filled in.");
            }
        }


        $scope.calculateValues = function (invoice) {
            $scope.subTotal = 0;
            $scope.total = 0;
            $scope.tax = 0;
            for (var i = 0; i < invoice.items.length; i++) {
                $scope.subTotal = $scope.subTotal + invoice.items[i].quantity * invoice.items[i].price;
            }
            $scope.tax = $scope.subTotal * $scope.taxRate;
            $scope.total = $scope.subTotal + $scope.tax;
        }

        //for modal
        $scope.invoiceTransfer = function (invoice) {
            $scope.requestedInvoice = invoice;
            //$scope.loadInvoiceItems();
            $scope.calculateValues($scope.requestedInvoice);
        };

        $scope.editOn = function (invoice) {
            $scope.removeOff();
            $scope.editOnId = invoice.id;
            $scope.requestedInvoice = invoice;
        }


        $scope.editOff = function () {
            $scope.editOnId = null;
            $scope.requestedInvoice = null;
            $scope.loadInvoicesInfo();
        }

        $scope.checkEdit = function (invoice) {
            return $scope.editOnId === invoice.id;
        }

        $scope.removeOn = function (invoice) {
            $scope.editOnId = null;
            $scope.removeOnId = invoice.id;
            $scope.requestedInvoice = invoice;
        }
        $scope.removeOff = function () {
            $scope.removeOnId = null;
            $scope.requestedInvoice = null;
        }
        $scope.checkRemove = function (invoice) {
            return $scope.removeOnId === invoice.id;
        }

        $scope.checkActions = function (invoice) {
            return $scope.checkEdit(invoice) || $scope.checkRemove(invoice);
        }

        $scope.loadInvoicesInfo();


        $scope.emailTransfer = function (email) {
            $scope.email = email;
        };
        $scope.email = {
            "id": 0,
            "date": "",
            "items": [],
            "status": 1,
            "customer": 0,
            "customerName": "",
            "billTo": {},
            "shipTo": {},
            "isDeleted": false,
            "mailTo": ""
        }
        $scope.email.date = new Date();
        $scope.email.date.toJSON();

        $scope.sendEmail = function () {
            dataService.create("emails", $scope.email, function (data) {
                if (data) {
                    notificationsConfig.success("Email sent");
                    $('#typeInEmailModal').modal('toggle');
                }
                else notificationsConfig.error("Sending Email failed!");
            })
        }
        $scope.printDiv = function (divName) {
            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'width=1000,height=1000');
            popupWin.document.open();
            popupWin.document.write('<!DOCTYPE html><html><head><link rel="stylesheet" href="css/bootstrap.min.css"><link rel="stylesheet" href="css/bootstrapYeti.css"><link rel="stylesheet" href="css/font-awesome.min.css"><link rel="stylesheet" href="css/style.css"></head><body onload="window.print()"><div class="reward-body">' + printContents + '</div></body></html>');
            popupWin.document.close();
        }

    });
}());