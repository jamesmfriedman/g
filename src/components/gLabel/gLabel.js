angular.module('G.label', []).directive('gLabel', function() {
	return {
		restrict: 'E',
		scope: {},
		link: function(scope, el, attrs) {
			el.addClass('g-label');
		}
	}
});