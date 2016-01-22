angular.module('G.tooltip').directive('gTooltip', function($compile, $rootScope, $animate) {
	return {
		restrict: 'A',

		link: function(scope, el, attrs) {
			var as = 'tooltip_' + Math.round(Math.random() * 10000 + Date.now());
			var show = as + '.showing';
			var observableAttr = attrs.title ? 'title' : 'gTooltip';
			var title = attrs.title || attrs.gTooltip;
			var timeout;
			var tooltipScope;
			var tooltipEl;
			el.attr('title', '');

			constructor();

			function constructor() {
				attrs.$observe(observableAttr, function(val) {
					if (val) {
						if (tooltipScope) {
							tooltipScope.title = val;
						} else {
							title = val;
						}
					}
				});
				
				
				el.on('mouseenter', function(evt){
					createTooltip();
					timeout = setTimeout(function(){showTip(evt);}, 500);
				});
				
				el.on('mouseleave', hideTip);
			}

			function createTooltip() {
				tooltipScope = scope.$new();
				tooltipScope.title = title;
				tooltipEl = $compile('<g-tooltip-overlay class="g-tooltip-overlay" params="{positionMode: \'swap\'}" ng-if="'+ show +'" as="'+ as +'">{{ title }}</g-tooltip-overlay>')(tooltipScope)
			}
				
			function showTip(evt) {
				if (tooltipScope.title) {
					tooltipScope[as].show(evt, el);
					tooltipScope.$digest();
				}
			}

			function hideTip(evt) {
				if (timeout) clearTimeout(timeout);
				tooltipScope[as].hide(evt, el);
				tooltipScope.$digest();
				tooltipEl.remove();
			}
		},
		controller: function($scope) {

		}
	};
});