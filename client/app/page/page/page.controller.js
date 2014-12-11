'use strict';

angular.module('cmsApp')
  .controller('PageCtrl', function ($scope, $http, $stateParams, socket, Auth, $rootScope) {
    var parent = $stateParams.parent,
        link = $stateParams.link,
        notFound = {
          title: '404 page not found',
          link: link
        };

    $scope.page = [];
    $scope.parents = [];
    $scope.childs = [];
    $scope.plugins = [];
    $scope.predicate = 'order';

    $http.get('/api/pages').success(function (pages) {
      for (var key in pages) {
        if (pages[key].parent === parent) {
          if (pages[key].link === link) {
            $scope.page = pages[key];
          }
        }
        else {
          if (pages[key].link === link) {
            $scope.page = pages[key];
          }
        }

        if (typeof pages[key].parent !== 'undefined') {
          $scope.childs.push(pages[key]);
        }

        if (pages[key].link !== link) {
          $scope.parents.push(pages[key].title);
        }
      }

      if ($scope.page.length === 0) {
        $scope.page = notFound;
      }

      $rootScope.title = $scope.page.title;

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
        link: page.link,
        parent: page.parent
      });
    };

    $scope.deletePage = function (page) {
      $http.delete('/api/pages/' + page._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('page');
    });
  });
