'use strict';

describe('Directive: pluginForm', function () {

  // load the directive's module and view
  beforeEach(module('cmsApp'));
  beforeEach(module('app/plugin-form/plugin-form.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<plugin-form></plugin-form>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the pluginForm directive');
  }));
});