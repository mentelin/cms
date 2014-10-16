'use strict';

angular.module('cmsApp')
  .controller('PageCtrl', function ($scope, $http, $stateParams, socket, Auth) {
    var link = $stateParams.link;

    $scope.page = [];

    $http.get('/api/pages').success(function (pages) {
      for (var key in pages) {
        if (pages[key].link === link) {
          $scope.page = pages[key];
        }
        else {
          $scope.page = {
            'title': '404 page not found',
            'link': link
          };
        }
      }

      socket.syncUpdates('page', $scope.page);
    });

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;

    $scope.editPage = function (page) {
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
