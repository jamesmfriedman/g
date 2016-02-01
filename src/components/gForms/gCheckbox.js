angular.module('G.checkbox', []).directive('gCheckbox', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<label class="g-checkbox" ng-transclude></label>',
		link: function(scope, el, attrs) {
			var input = el.find('input');
			input.after('<span class="checkbox"></span>');
			el.on('touchstart', function(evt){
				input.prop('checked', !input.prop('checked'));
				evt.preventDefault();
			});
		},
		controller: function($scope) {

		}
	};
});