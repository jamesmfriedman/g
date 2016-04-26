angular.module('G.forms').directive('gClearableInput', function($compile, gHelpers) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, el, attrs, ngModelCtrl) {
			var childScope = scope.$new();
			
			childScope.clearInputValue = function() {
				ngModelCtrl.$setViewValue('', 'gClearableInput');
				ngModelCtrl.$render();
				el[0].focus();
			};

			childScope.getModelValue = function() {
				return ngModelCtrl.$viewValue;
			};

			el.after($compile('<g-btn-close class="g-clearable-input-control animate" ng-show="getModelValue()" ng-click="clearInputValue()"></g-btn-close>')(childScope));
		}
	};
});