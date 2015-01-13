'use strict';

angular.module('cmsApp')
  .controller('PageCtrl', function ($scope, $http, $stateParams, socket, Auth, $rootScope) {
    var path = $stateParams.path,
        notFound = {
          title: '404 page not found',
          link: path
        },
        pathArr = path.split('/');

    if (typeof pathArr[pathArr.length - 1] === 'undefined') {
      pathArr = pathArr.slice(0, -1);
    }

    $scope.page = [];
    $scope.pages = [];
    $scope.parents = [];
    $scope.childs = [];
    $scope.plugins = [];
    $scope.predicate = 'order';

    $http.get('/api/pages').success(function (pages) {
      $scope.pages = pages;

      for (var key in pages) {
        if (pathArr.length > 1) {
          for (var i = pathArr.length - 1; i >= 0; i--) {
            if (pages[key].link === pathArr[i]) {
              $scope.page = pages[key];
            }
          }
        }
        else {
          if (pages[key].link === pathArr[0]) {
            $scope.page = pages[key];
          }
        }

        if (typeof pages[key].parent !== 'undefined') {
          $scope.childs.push(pages[key]);
        }

        if (pages[key].link !== pathArr[pathArr.length - 1]) {
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

    $scope.getURL = function (parent, link) {
      if (typeof parent !== 'undefined') {
        return '/' + $scope.getTitle(parent) + '/' + link;
      }

      return '/' + link;
    };

    $scope.getTitle = function (id) {
      for (var key in $scope.pages) {
        if ($scope.pages[key]._id === id) {
          return $scope.pages[key].title;
        }
      }
    };

    $scope.setLink = function (link) {
      $scope.newPage.link = link.replace(/\s+/g, '-').toLowerCase();
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('page');
    });
  });
