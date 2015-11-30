angular.module('G.btn').directive('gBtnGroup', function() {
	return {
		restrict: 'E',
		link: function(scope, el, attrs) {
			el.addClass('g-btn-group');
		}
	}
});