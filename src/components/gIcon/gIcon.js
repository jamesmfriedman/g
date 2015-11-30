angular.module('G.icon', []).directive('gIcon', function(gConfig) {
	return {
		restrict: 'A',
		link: function(scope, el, attrs) {
			el.addClass(gConfig.iconPrefix + attrs.gIcon);
		}
	}
});