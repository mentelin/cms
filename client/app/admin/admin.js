(function (angular) {
  'use strict';

  var config = function ($stateProvider) {
    $stateProvider.state('admin', {
      url: '/admin',
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminCtrl',
      controllerAs: 'adminCtrlAs'
    });
  };

  angular.module('cmsApp')
    .config(config);
})(window.angular);
