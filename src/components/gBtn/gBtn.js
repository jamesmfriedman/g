angular.module('G.btn').directive('gBtn', function(gHelpers) {
	return {
		restrict: 'EC',
		link: function(scope, el, attrs) {
            gHelpers.makeTouchable(el);

			if (!attrs.role) {
				el.attr('role', 'button');
			}		
		}
	};
});