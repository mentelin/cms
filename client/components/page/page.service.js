(function (angular) {
  'use strict';

  var Page = function ($resource) {
    return $resource('/api/pages/:id', {
        id: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
  };

  angular.module('cmsApp')
    .factory('Page', Page);
})(window.angular);
