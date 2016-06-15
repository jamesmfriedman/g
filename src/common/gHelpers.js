angular.module('G.common').service('gHelpers', function($animate, $parse) {
	/**
	 * To be executed inside of a link function
	 */
	function directiveApiLink(scope, el, attrs, ctrl) {
		if ('as' in attrs) {
			$parse(attrs.as).assign(scope.$parent, ctrl);
			return attrs.as;
		}

		return false;
	}

	/**
	 * Makes an element animatable
	 */
	function makeAnimatable(el, attrs) {
		el.addClass('animate');
		attrs = attrs || {};
		
		if (attrs.ngIf || attrs.ngSwitchWhen) {
			$animate.enabled(el, true);
			$animate.enter(el, el.parent(), el);
		} else {
			$animate.enabled(el, true);	
		}
	}

	function makeTouchable(el) {
		el.on('touchstart', function(){
            el.addClass('touch');
        });

        el.on('touchmove', function(){
            el.removeClass('touch').addClass('touchmove');
        });

        el.on('touchend touchcancel', function(){
            el.removeClass('touch touchmove');
        });
	}
	
	return {
		directiveApiLink: directiveApiLink,
		makeAnimatable: makeAnimatable,
		makeTouchable: makeTouchable
	};
});