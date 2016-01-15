angular.module('G.toggle', []).directive('gToggle', function() {
	return {
		restrict: 'A',
		link: function(scope, el, attrs) {
			el.on('mouseleave', function(){
				el.removeClass('on-added');
			});
			scope.$watch(attrs.gToggle, function(val){
				if (val === undefined) {
					val = false;
				}
				
				if (val) {
					el.addClass('on on-added').removeClass('off');
					setTimeout(function(){
						el.removeClass('on-added');
					}, 5000);
				} else {
					el.addClass('off').removeClass('on on-added');
				}
			});
		},
		controller: function($scope) {

		}
	}
});