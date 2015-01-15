'use strict';

angular.module('cmsApp')
  .directive('plugin', function () {
    return {
      link: function (scope, element, attrs) {
        scope.contentUrl = 'components/plugins/' + attrs.type + '/' + attrs.type + '.html';

        attrs.$observe('type', function (type) {
          scope.contentUrl = 'components/plugins/' + type + '/' + type + '.html';
        });
      },
      template: '<div ng-include="contentUrl"></div>'
    };
  });