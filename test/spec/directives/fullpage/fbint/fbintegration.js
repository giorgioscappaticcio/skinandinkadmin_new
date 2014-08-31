'use strict';

describe('Directive: fullpage/fbInt/fbintegration', function () {

  // load the directive's module
  beforeEach(module('adminApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fullpage/fb-int/fbintegration></fullpage/fb-int/fbintegration>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fullpage/fbInt/fbintegration directive');
  }));
});
