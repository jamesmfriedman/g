angular.module('G.btn').directive('gBtn', function() {
	return {
		restrict: 'E',
		link: function(scope, el, attrs) {
			if (!attrs.role) {
				el.attr('role', 'button');
			}		
		}
	}
});