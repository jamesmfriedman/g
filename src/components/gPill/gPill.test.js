describe('Unit testing directive "gPill"', function() {
  var $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('&#39;G.pill&#39;, []'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it(':::Describe what this test does:::', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<g-pill></g-pill>')($rootScope);
    
    // fire all the watches, so the scope will be evaluated
    $rootScope.$digest();
    
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain('::: Contains some text :::');
  });
});