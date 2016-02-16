angular.module('G.tooltip').directive('gTooltip', function($compile, $document, $rootScope, $animate) {
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
			var body = angular.element($document[0].body);
			var isTouchEvent;

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
				
				
				el.on('mouseenter touchstart', function(evt){
					
					//blocks the mouse enter event from firing if we are already in a touch event
					if (isTouchEvent) return; 

					isTouchEvent = evt.type === 'touchstart';
					el.one('mouseleave touchend touchcancel', hideTip);
					body.one('touchend touchcancel', hideTip);

					if (!timeout) {
						createTooltip();
						timeout = setTimeout(function(){showTip(evt);}, 500);
					}
				});
			}

			function createTooltip() {
				tooltipScope = scope.$new();
				tooltipScope.title = title;
				tooltipEl = $compile('<g-tooltip-overlay class="g-tooltip-overlay" params="{positionMode: \'swap\'}" ng-if="'+ show +'" as="'+ as +'">{{ title }}</g-tooltip-overlay>')(tooltipScope);
			}
				
			function showTip(evt) {
				if (tooltipScope.title) {
					tooltipScope[as].show(evt, el);
					tooltipScope.$digest();
				}
			}

			function hideTip(evt) {
				// wait a 100 ms before we actually cancel the touch event
				// otherwise our touch will create a mousenter
				setTimeout(function(){
					isTouchEvent = false;
				}, 100); 
				
				if (timeout) clearTimeout(timeout);
				timeout = undefined;
				tooltipScope[as].hide(evt, el);
				tooltipScope.$digest();
				tooltipEl.remove();
			}
		},
		controller: function($scope) {

		}
	};
});