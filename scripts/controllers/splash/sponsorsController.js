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

          if (storage.data.hasConnectionProblem == true) {
              $scope.hasError = true;
              $scope.error = "Connection Error!";
          } else {
              if (storage.data.Sponsors.length > 0 && storage.data.ShowSponsorsScreen) {
                  $timeout(function () {
                      $scope.redirectToHomePage();
                  }, 3000);
              } else {
                  $scope.redirectToHomePage();
              }
          }

          
      });
})();
