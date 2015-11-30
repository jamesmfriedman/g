angular.module('G.btn').directive('gBtn', function() {
	return {
		restrict: 'E',
		link: function(scope, el, attrs) {
			el.addClass('g-btn');

			if (!attrs.role) {
				el.attr('role', 'button');
			}			
		}
	}
});