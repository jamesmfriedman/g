angular.module('G.badge', []).directive('gBadge', function(gHelpers) {
	return {
		restrict: 'E',
		scope: {},
		link: function(scope, el, attrs) {
			gHelpers.makeAnimatable(el, attrs);					
		}
	};
});