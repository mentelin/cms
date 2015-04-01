(function (angular) {
  'use strict';

  var config = function config ($stateProvider) {
    $stateProvider.state('page', {
      url: '/{path:.*}',
      templateUrl: 'app/page/page.html',
      controller: 'PageCtrl',
      controllerAs: 'pageCtrl'
    });
  };

  angular.module('cmsApp')
    .config(config);
})(window.angular);
