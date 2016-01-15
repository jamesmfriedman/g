angular.module('G.dropdown').directive('gDropdownToggle', function($document) {
	return {
		restrict: 'A',
		link: function(scope, el, attrs) {
			var dropdownCtrl;

			var init = function() {
				dropdownCtrl = scope[attrs.gDropdownToggle];
				el.on('click', function(){
					dropdownCtrl.toggle(el);
					scope.$apply();
				});
			};

			setTimeout(init);
		}
	};
});