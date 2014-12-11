'use strict';

angular.module('cmsApp')
  .controller('PageListingCtrl', function ($scope, $http, socket, Auth, $rootScope) {
    $scope.pages = [];
    $scope.childs = [];
    $scope.parents = [];

    $rootScope.title = 'Pages';

    $http.get('/api/pages').success(function (pages) {
      $scope.pages = pages;

      for (var key in pages) {
        $scope.parents.push(pages[key]);
      }

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

      if ($scope.newPage.parent === '') {
        return;
      }

      $http.post('/api/pages', {
        title: $scope.newPage.title,
        link: $scope.newPage.link,
        parent: $scope.newPage.parent
      });

      $scope.newPage = [];
    };

    $scope.deletePage = function (page) {
      $http.delete('/api/pages/' + page._id);
    };

    $scope.getURL = function (parent, link) {
      if (typeof parent !== 'undefined') {
        return '/' + parent + '/' + link;
      }

      return '/' + link;
    };

    $scope.setLink = function (link) {
      $scope.newPage.link = link.replace(/\s+/g, '-').toLowerCase();
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('page');
    });
  });
