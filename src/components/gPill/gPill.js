angular.module('G.pill', []).directive('gPill', function() {
	return {
		restrict: 'E',
		scope: {},
		link: function(scope, el, attrs) {
			el.addClass('g-pill')
		},
		controller: function($scope) {

		}
	}
});