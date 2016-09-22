﻿(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('emailsController', function ($scope, dataService) {
        
        $scope.email = {
            mailTo : "",
            html : '<div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header bg-info"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h2 class="modal-title">INVOICE #{{requestedInvoice.id}}{{requestedInvoice.status}}</h2> </div><div class="modal-body"> <div class="row"> <div class="col-md-4"> <h2>XYZ<br/><small>Makes billing easy</small></h2> </div><div class="col-md-4 col-md-offset-4 text-right"> <h4>Date:{{requestedInvoice.date | date: 'mediumDate'}}</h4> <h5>Invoice ID:{{requestedInvoice.id}}</h5> <h5>Customer ID:{{requestedInvoice.customer}}</h5> </div></div><div class="row"> <div class="col-md-4"> <div class="panel panel-default"> <div class="panel-heading"><h3 class="panel-title"><strong>From:</strong></h3></div><div class="panel-body"> <p>2854 Granville Lane</p><p>Newark, 07104</p><p>973-482-1872</p><p> </p><p> </p></div></div></div><div class="col-md-4 "> <div class="panel panel-info"> <div class="panel-heading"><h3 class="panel-title"><strong>Bill To:</strong></h3></div><div class="panel-body"> <p>Customer Name:{{requestedInvoice.billTo.name}}</p><p>Company Name:{{requestedInvoice.billTo.companyName}}</p><p>Street Address:{{requestedInvoice.billTo.streetAddress}}</p><p>City, Zip:{{requestedInvoice.billTo.city}},{{requestedInvoice.billTo.zipCode}}</p><p>Phone/Fax:{{requestedInvoice.billTo.phoneNumber}}</p></div></div></div><div class="col-md-4"> <div class="panel panel-success"> <div class="panel-heading"><h3 class="panel-title"><strong>Ship To:</strong></h3></div><div class="panel-body"> <p>Customer Name:{{requestedInvoice.shipTo.name}}</p><p>Company Name:{{requestedInvoice.shipTo.companyName}}</p><p>Street Address:{{requestedInvoice.shipTo.streetAddress}}</p><p>City, Zip:{{requestedInvoice.shipTo.city}},{{requestedInvoice.shipTo.zipCode}}</p><p>Phone/Fax:{{requestedInvoice.shipTo.phoneNumber}}</p></div></div></div></div><table class="table table-hover"> <thead class="bg-primary"> <tr> <th class="col-md-1"><h4>ID</h4></th> <th class="col-md-2"><h4>Description</h4></th> <th class="col-md-2"><h4>Amount</h4></th> <th class="col-md-2"><h4>Quantity</h4></th> <th class="col-md-2"><h4>Total</h4></th> </tr></thead> <tbody> <tr ng-repeat="item in requestedInvoice.items"> <td class="col-md-1">{{item.id}}</td><td class="col-md-2">{{item.description}}</td><td class="col-md-2">{{item.price}}</td><td class="col-md-2">{{item.quantity}}</td><td class="col-md-2">{{item.quantity * item.price | number:2}}</td></tr></tbody> </table> <div class="row"> <div class="col-md-3 col-md-offset-9"> <p><strong>Subtotal:{{subTotal | number:2}}</strong></p><p><strong>Tax Rate:{{taxRate | number:2}}</strong></p><p><strong>Tax:{{tax | number:2}}</strong></p><p><strong>Other: </strong></p><h3><strong>TOTAL:{{total | number:2}}</strong></h3> </div></div></div><div class="modal-footer bg-info"> <button type="button" class="btn btn-primary" onclick="sendEmail()">Email the invoice</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div></div></div>'
    })
        $scope.sendEmail() = function () {
            dataService.create("emails", $scope.newCustomer, function (data) {
                $scope.loadCustomersInfo();
                if (data) {
                    notificationsConfig.success("Customer added");
                }
                else notificationsConfig.error("Adding customers failed!");
            })
        }
});
}());