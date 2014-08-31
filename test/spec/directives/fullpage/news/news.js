'use strict';

describe('Directive: fullpage/news/news', function () {

  // load the directive's module
  beforeEach(module('adminApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fullpage/news/news></fullpage/news/news>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fullpage/news/news directive');
  }));
});
