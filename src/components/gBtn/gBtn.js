angular.module('G.btn').directive('gBtn', function(gHelpers, $compile) {
	return {
		restrict: 'EC',
		link: function(scope, el, attrs) {
            gHelpers.makeTouchable(el);

			if (!attrs.role) {
				el.attr('role', 'button');
			}

            el.prepend($compile('<g-ink></g-ink>')(scope));
		}
	};
});