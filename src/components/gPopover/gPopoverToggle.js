angular.module('G.popover').directive('gPopoverToggle', function(gMixins, $document) {
	return {
		restrict: 'A',
		scope: {
			params: '=?'
		},
		link: function(scope, el, attrs) {
			var popoverCtrl;
			var activation = scope.params && scope.params.activation ? scope.params.activation : 'hover';
			var popoverEl = null;

			var init = function() {
				popoverCtrl = scope.$parent[attrs.gPopoverToggle];

				if (activation == 'click') {
					el.on('click', toggle);
				} else {
					el.on('mouseenter', show);
					el.on('mouseleave', hide)
				};
			};

			var show = function() {
				popoverCtrl.show(el);
				scope.$apply();

				if (popoverEl) {
					popoverEl.off('mouseleave', hide);
					popoverEl = null;
				}
			};

			var hide = function(evt) {
				var toEl = angular.element(evt.toElement);

				if (toEl.attr('as') === attrs.gPopoverToggle) {
					popoverEl = toEl;
					popoverEl.one('mouseleave', hide);
					return;
				}

				popoverCtrl.hide(el);
				scope.$apply();
			};

			var toggle = function() {
				popoverCtrl.toggle(el);
				scope.$apply();
			};

			setTimeout(init);
		}
	};
});