'use strict';

angular.module('cmsApp')
  .controller('PluginListingCtrl', function ($scope, $http, socket, Auth) {
    $scope.pages = [];
    $scope.plugins = [];
    $scope.predicate = 'order';

    $http.get('/api/pages').success(function (pages) {
      $scope.pages = pages;

      socket.syncUpdates('page', $scope.pages);
    });

    $http.get('/api/plugins').success(function (plugins) {
      $scope.plugins = plugins;

      socket.syncUpdates('plugin', $scope.plugins);
    });

    $scope.isAdmin = Auth.isAdmin;

    $scope.addPlugin = function () {
      if ($scope.newPlugin.name === '') {
        return;
      }

      if ($scope.newPlugin.idPage === '') {
        return;
      }

      if ($scope.newPlugin.order === '') {
        return;
      }

      $http.post('/api/plugins', {
        name: $scope.newPlugin.name,
        idPage: $scope.newPlugin.idPage,
        order: $scope.newPlugin.order
      });

      $scope.newPlugin = '';
    };

    $scope.deletePlugin = function (plugin) {
      $http.delete('/api/plugins/' + plugin._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('plugin');
    });
  });
