/**
 * A convenience directive for making things touchable
 * adds touch and touchmove
 */
angular.module('G.touch', []).directive('gTouch', function(gHelpers) {
	return {
		restrict: 'A',
		link: function(scope, el) {
			gHelpers.makeTouchable(el);
		}
	};
});