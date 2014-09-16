(function () {
    'use strict';
    angular.module('GMA')
      .controller('SponsorsController', function ($scope, $state, $timeout, $ionicViewService, splashSettings, storage, menuHandler, $rootScope) {
          $scope.sponsors = storage.data.Sponsors;
          $scope.ThemeCssClass = storage.data.ThemeCssClass;
          $scope.redirectToHomePage = function () {
              var homepageDefaultMenuItem = storage.data.HomePageMenuItem;
              if (!_.isUndefined(homepageDefaultMenuItem)) {
                  var stateToRedirect = menuHandler.getMenuItemState(homepageDefaultMenuItem);
                  var menuId = homepageDefaultMenuItem.Id;
                  $state.go(stateToRedirect, { id: menuId });
              } else {
                  $state.go('main.home');
              }
          };
          $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from) {
              var backToClientInfo = from.name == "sponsors" && to.name == "clientInfo";
              if (backToClientInfo) {
                  navigator.app.exitApp();
              }
          });
          if (storage.data.Sponsors.length > 0) {
              $timeout(function () {
                  $scope.redirectToHomePage();
              }, splashSettings.duration);
          } else {
              $scope.redirectToHomePage();
          }
      });
})();
