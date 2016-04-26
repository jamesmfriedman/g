/**
 * A select directive that will set its value on the select element itself
 * under the key of "value"
 */
angular.module('G.forms').directive('select', function($window) {
	return {
		restrict: 'E',
		require: '?ngModel',
		link: function(scope, el, attrs, ngModel) {
			var setVal =  function() {
				$window.requestAnimationFrame(function(){
					el.attr('value', el.val());
				});
			};

			if (!attrs.value) {
				setVal();	
				
				// set our val on dom cahgne
				el.on('change', function(){
					setVal();
				});

				if (ngModel) {
					// a little hack for ngModel, hook into the formatters pipeline as a passthrough
					// this just lets us know our model got updated without having to do a watch.
					ngModel.$formatters.push(function(value){
						setVal();
						return value;
					});
				}
			}

			scope.$on('$destroy', function(){
				el = null;
			});
		},
	};
});