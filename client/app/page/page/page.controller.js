'use strict';

angular.module('cmsApp')
  .controller('PageCtrl', function ($scope, $http, $stateParams, socket, Auth) {
    var link = $stateParams.link;

    $scope.page = [];

    $http.get('/api/pages').success(function (pages) {
      for (var key in pages) {
        var object = pages[key].link;

        if (object === link) {
          $scope.page = pages[key];
        }
      }

      socket.syncUpdates('page', $scope.page);
    });

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;

    $scope.editBook = function (page) {
      $http.put('/api/pages/' + page._id, {
        title: page.title,
        link: page.link
      });
    };

    $scope.deletePage = function (page) {
      $http.delete('/api/pages/' + page._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('page');
    });
  });
