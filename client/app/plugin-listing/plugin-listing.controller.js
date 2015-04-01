(function (angular) {
  'use strict';

  var PluginListingCtrl = function ($http, socket, Auth) {
    var vm = this;

    this.pages = [];
    this.plugins = [];
    this.predicate = 'order';

    $http.get('/api/pages').success(function (pages) {
      vm.pages = pages;

      socket.syncUpdates('page', vm.pages);
    });

    $http.get('/api/plugins').success(function (plugins) {
      vm.plugins = plugins;

      socket.syncUpdates('plugin', vm.plugins);
    });

    this.isAdmin = Auth.isAdmin;

    this.addPlugin = function () {
      if (vm.newPlugin.name === '') {
        return;
      }

      if (vm.newPlugin.idPage === '') {
        return;
      }

      if (vm.newPlugin.order === '') {
        return;
      }

      $http.post('/api/plugins', {
        name: vm.newPlugin.name,
        idPage: vm.newPlugin.idPage,
        order: vm.newPlugin.order
      });

      vm.newPlugin = {};
    };

    this.deletePlugin = function (plugin) {
      $http.delete('/api/plugins/' + plugin._id);
    };
  };

  angular.module('cmsApp')
    .controller('PluginListingCtrl', PluginListingCtrl);
})(window.angular);
