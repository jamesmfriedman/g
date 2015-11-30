angular.module('G.badge', []).directive('gBadge', function() {
	return {
		restrict: 'E',
		scope: {},
		link: function(scope, el, attrs) {
			el.addClass('g-badge');
		},
		controller: function($scope) {

		}
	}
});