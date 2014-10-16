'use strict';

angular.module('cmsApp')
  .controller('PluginCtrl', function ($scope, $http, socket, Auth, $stateParams) {
    $scope.plugin = [];
    $scope.pages = [];

    $http.get('/api/pages').success(function (pages) {
      $scope.pages = pages;

      socket.syncUpdates('page', $scope.pages);
    });

    $http.get('/api/plugins/' + $stateParams.id).success(function (plugin) {
      $scope.plugin = plugin;

      socket.syncUpdates('plugin', $scope.plugin);
    });

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;

    $scope.editPlugin = function (plugin) {
      $http.put('/api/plugins/' + plugin._id, {
        title: plugin.title,
        link: plugin.link
      });
    };

    $scope.deletePlugin = function (plugin) {
      $http.delete('/api/plugins/' + plugin._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('plugin');
    });
  });
