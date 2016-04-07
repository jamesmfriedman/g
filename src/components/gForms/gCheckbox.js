angular.module('G.forms').directive('gCheckbox', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<label class="g-checkbox" ng-transclude></label>',
		link: function(scope, el, attrs) {
			var input = el.find('input');
			input.after('<span class="checkbox"></span>');
		},
		controller: function($scope) {

		}
	};
});