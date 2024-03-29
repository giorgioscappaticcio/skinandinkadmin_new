'use strict';

describe('Directive: fullpage/fbInt/news', function () {

  // load the directive's module
  beforeEach(module('adminApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fullpage/fb-int/news></fullpage/fb-int/news>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fullpage/fbInt/news directive');
  }));
});
