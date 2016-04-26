angular.module('G.popover').directive('gPopoverToggle', function($document, $window) {
	return {
		restrict: 'A',
		scope: {
			params: '=?'
		},
		link: function(scope, el, attrs) {
			var popoverCtrl;
			var activation = scope.params && scope.params.activation ? scope.params.activation : 'hover';
			var popoverEl = null;

			constructor();

			function constructor() {
				$window.requestAnimationFrame(function(){
					popoverCtrl = scope.$parent[attrs.gPopoverToggle];
					if (activation === 'click') {
						el.on('click', toggle);
					} else {
						el.on('mouseenter', show);
						el.on('mouseleave', hide);
					}
				});

				$scope.$on('$destroy', destroy);
			}

			function destroy() {
				el = null;
				popoverEl = null;
			}

			function show(evt) {
				popoverCtrl.show(evt, el);
				scope.$applyAsync();

				if (popoverEl) {
					popoverEl.off('mouseleave', hide);
					popoverEl = null;
				}
			}

			function hide(evt) {
				var toEl = angular.element(evt.toElement);

				if (toEl.attr('as') === attrs.gPopoverToggle) {
					popoverEl = toEl;
					popoverEl.one('mouseleave', hide);
					return;
				}

				popoverCtrl.hide(evt, el);
				scope.$applyAsync();
			}

			function toggle() {
				popoverCtrl.toggle(el);
				scope.$applyAsync();
			}
		}
	};
});