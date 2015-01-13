'use strict';

describe('Directive: plugin', function () {

  // load the directive's module and view
  beforeEach(module('cmsApp'));
  beforeEach(module('components/plugins/form/form.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<form></form>');
    element = $compile(element)(scope);
    scope.$apply();
    // expect(element.text()).toBe('this is the pluginForm directive');
  }));
});