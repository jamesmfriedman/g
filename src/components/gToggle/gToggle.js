angular.module('G.toggle', []).directive('gToggle', function() {
	return {
		restrict: 'A',
		scope: {
			expr: '&gToggle'
		},
		link: function(scope, el, attrs) {
			el.on('mouseleave', function(){
				el.removeClass('on-added');
			});

			scope.$watch('expr()', function(val){
				if (val) {
					el.addClass('on on-added').removeClass('off');
				} else {
					el.addClass('off').removeClass('on on-added');
				}
			});
		},
		controller: function($scope) {

		}
	}
});