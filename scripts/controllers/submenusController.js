(function () {
    'use strict';
    angular.module('GMA').controller('SubmenusController', function($scope, api, menuHandler, $stateParams) {
        api.menus.submenus($stateParams.id).then(function(data) {
            $scope.menu = data;
            _.map($scope.menu.Children, function (menuItem) {
                return menuHandler.mapMenuTemplateRoute(menuItem);
            });
        });
    });
})();
