'use strict';

angular.module('cmsApp')
  .directive('plugin', function () {
    return {
      templateUrl: function (el, attr) {
        return 'components/plugins/' + attr.type + '/' + attr.type + '.html';
      },
      restrict: 'EA'
    };
  });