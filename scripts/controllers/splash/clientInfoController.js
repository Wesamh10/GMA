(function () {
    'use strict';
    angular.module('GMA').controller('ClientInfoController', function ($scope, $state, $timeout, splashSettings, api, storage, serverUrlHandler, pushNotificationHandler) {
        $scope.clientLoaded = false;

        serverUrlHandler.resolve();

        $scope.ImageLoaded = false;
        $scope.ImageLoadCompelete = function () {
            $scope.ImageLoaded = true;
        };

        api.client.details().then(function (data) {
            $scope.client = { Name: data.Name, Logo: data.Logo };
            storage.data.Sponsors = data.Sponsors;
            storage.data.HomePageMenuItem = data.HomePageMenuItem;
            storage.data.ThemeCssClass = data.ThemeCssClass;
            $scope.ThemeCssClass = data.ThemeCssClass;
            $scope.clientLoaded = true;
            $scope.hasLogo = data.Logo != '';
            
            // register push notifications
            var isRegistered = pushNotificationHandler.isRegistered();
            if (isRegistered == false)
                pushNotificationHandler.register();

            $timeout(function () {
                $state.go('sponsors');
            }, splashSettings.duration);
        });
    });
})();
