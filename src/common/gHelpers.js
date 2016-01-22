angular.module('G.common').service('gHelpers', function($animate) {
	/**
	 * To be executed inside of a link function
	 */
	function directiveApiLink(scope, el, attrs, ctrl) {
		if ('as' in attrs) {
			if (typeof scope.$parent[attrs.as] === 'object') {
				angular.merge(scope.$parent[attrs.as], ctrl);
			} else {
				scope.$parent[attrs.as] = ctrl;
			}
		}
	};

	/**
	 * Makes an element animatable
	 */
	function makeAnimatable(el, attrs) {
		el.addClass('animate');
		
		if (attrs.ngIf) {
			$animate.enabled(el, true);
			$animate.enter(el, el.parent(), el);
		} else {
			$animate.enabled(el, true);	
		}
	};
	
	return {
		directiveApiLink: directiveApiLink,
		makeAnimatable: makeAnimatable
	}
});