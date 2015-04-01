(function (angular) {
  'use strict';

  var PluginCtrl = function ($http, socket, Auth, $stateParams) {
    var vm = this;

    this.plugin = [];
    this.pages = [];

    $http.get('/api/pages').success(function (pages) {
      vm.pages = pages;

      socket.syncUpdates('page', vm.pages);
    });

    $http.get('/api/plugins/' + $stateParams.id).success(function (plugin) {
      vm.plugin = plugin;

      socket.syncUpdates('plugin', vm.plugin);
    });

    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;

    this.editPlugin = function (plugin) {
      $http.put('/api/plugins/' + plugin._id, {
        name: plugin.name,
        idPage: plugin.idPage,
        order: plugin.order
      });
    };

    this.deletePlugin = function (plugin) {
      $http.delete('/api/plugins/' + plugin._id);
    };
  };

  angular.module('cmsApp')
    .controller('PluginCtrl', PluginCtrl);
})(window.angular);
