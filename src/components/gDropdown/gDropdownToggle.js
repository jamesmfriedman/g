angular.module('G.dropdown').directive('gDropdownToggle', function(gDropdowns) {
	return {
		restrict: 'A',
		link: function(scope, el, attrs) {
			var init = function() {
				el.on('click', function(evt){
					gDropdowns[attrs.gDropdownToggle].toggle(evt, el);
				});
			};

			setTimeout(init);
		}
	};
});