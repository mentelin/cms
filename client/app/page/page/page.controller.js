'use strict';

angular.module('cmsApp')
  .controller('PageCtrl', function ($scope, $http, $stateParams, socket, Auth, $rootScope) {
    var link = $stateParams.link;

    $rootScope.title = $scope.page.title;

    $scope.plugins = [];
    $scope.page = [];
    $scope.predicate = 'order';

    $http.get('/api/pages').success(function (pages) {
      for (var key in pages) {
        if (pages[key].link === link) {
          $scope.page = pages[key];
        }
        else {
          $scope.page = {
            title: '404 page not found',
            link: link
          };
        }
      }

      socket.syncUpdates('page', $scope.page);
    });

    $http.get('/api/plugins').success(function (plugins) {
      for (var key in plugins) {
        if (plugins[key].idPage === $scope.page._id) {
          $scope.plugins.push(plugins[key]);
        }
      }

      socket.syncUpdates('plugin', $scope.plugins);
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
