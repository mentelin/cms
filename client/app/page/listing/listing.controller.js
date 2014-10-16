'use strict';

angular.module('cmsApp')
  .controller('PageListingCtrl', function ($scope, $http, socket, Auth) {
    $scope.pages = [];

    $http.get('/api/pages').success(function (pages) {
      $scope.pages = pages;

      socket.syncUpdates('page', $scope.pages);
    });

    $scope.isAdmin = Auth.isAdmin;

    $scope.addPage = function () {
      if ($scope.newPage.title === '') {
        return;
      }

      if ($scope.newPage.link === '') {
        return;
      }

      $http.post('/api/pages', {
        title: $scope.newPage.title,
        link: $scope.newPage.link
      });

      $scope.newPage = '';
    };

    $scope.deletePage = function (page) {
      $http.delete('/api/pages/' + page._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('page');
    });
  });
