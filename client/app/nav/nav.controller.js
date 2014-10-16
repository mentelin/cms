'use strict';

angular.module('cmsApp')
  .controller('NavCtrl', function ($scope, $http, socket, Auth) {
    $scope.navs = [];

    $http.get('/api/navs').success(function (navs) {
      $scope.navs = navs;
      socket.syncUpdates('nav', $scope.navs);
    });

    $scope.isAdmin = Auth.isAdmin;

    $scope.addNav = function () {
      if ($scope.newNav.title === '') {
        return;
      }

      if ($scope.newNav.link === '') {
        return;
      }

      $http.post('/api/navs', {
        title: $scope.newNav.title,
        link: $scope.newNav.link
      });

      $scope.newNav = '';
    };

    $scope.deleteNav = function (nav) {
      $http.delete('/api/navs/' + nav._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('nav');
    });
  });
