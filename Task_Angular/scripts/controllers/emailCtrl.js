(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('emailsController', function ($scope, dataService) {
        
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

        $scope.sendEmail() = function () {
            dataService.create("emails", $scope.email, function (data) {
                $scope.loadCustomersInfo();
                if (data) {
                    notificationsConfig.success("Email sent");
                }
                else notificationsConfig.error("Sending Email failed!");
            })
        }
});
}());