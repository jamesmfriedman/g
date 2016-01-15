angular.module('G.tooltip').directive('gTooltip', function($compile, $rootScope) {
	return {
		restrict: 'A',

		link: function(scope, el, attrs) {
			var as = 'tooltip_' + Math.round(Math.random() * 10000 + Date.now());
			var show = as + '.showing';
			var title = attrs.title || attrs.gTooltip;
			el.attr('title', '');

			$compile('<g-tooltip-overlay class="g-tooltip-overlay" params="{positionMode: \'swap\'}" ng-if="'+ show +'" as="'+ as +'">' + title + '</g-tooltip-overlay>')(scope);
				
			var show = function() {
				scope[as].show(el);
				$rootScope.$apply();
			};

			var hide = function() {
				scope[as].hide(el);
				$rootScope.$apply();
			};

			el.on('mouseenter', show);
			el.on('mouseleave', hide);
		},
		controller: function($scope) {

		}
	}
});