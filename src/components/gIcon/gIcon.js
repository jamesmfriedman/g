angular.module('G.icon', []).directive('gIcon', function(gConfig) {
	return {
		restrict: 'A',
		link: function(scope, el, attrs) {
			var currentClass = '';
			el.addClass('g-icon');

			attrs.$observe('gIcon', function(val){
				if (val) {
					el.removeClass(currentClass);
					currentClass = gConfig.iconPrefix + attrs.gIcon;
					el.addClass(currentClass);	
				}
			});
		}
	}
});