angular.module('G.tabs').directive('gTab', function() {
	return {
		restrict: 'E',
	link: function(scope, el, attrs) {
			el.addClass('g-tab');
		}
	}
});