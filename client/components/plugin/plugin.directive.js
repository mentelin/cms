(function (angular) {
  'use strict';

  var plugin = function () {
    return {
      scope: {
        content: '='
      },
      link: function (scope, element, attrs) {
        scope.contentUrl = 'components/plugin-' + attrs.name + '/' + attrs.name + '.html';

        attrs.$observe('name', function (name) {
          scope.contentUrl = 'components/plugin-' + name + '/' + name + '.html';
        });
      },
      template: '<div ng-include="contentUrl"></div>'
    };
  };

  angular.module('cmsApp')
    .directive('plugin', plugin);
})(window.angular);
