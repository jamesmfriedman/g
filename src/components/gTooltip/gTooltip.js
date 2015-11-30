angular.module('G.tooltip').directive('gTooltip', function($compile, $rootScope) {
	return {
		restrict: 'A',

		link: function(scope, el, attrs) {
			var api = 'tooltip_' + Math.round(Math.random() * 10000 + Date.now());
			var show = 'show_' + api;
			var title = attrs.title || attrs.gTooltip;
			el.attr('title', '');

			$compile('<g-tooltip-overlay class="g-tooltip-overlay" params="{position: \'top center \', positionMode: \'swap\'}" ng-if="'+ show +'" api="'+ api +'">' + title + '</g-tooltip-overlay>')(scope);
				
			var show = function() {
				scope[api].show(el);
				$rootScope.$apply();
			};

			var hide = function() {
				scope[api].hide(el);
				$rootScope.$apply();
			};

			el.on('mouseenter', show);
			el.on('mouseleave', hide);
		},
		controller: function($scope) {

		}
	}
});