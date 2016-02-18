angular.module('G.tabs').directive('gTabs', function(gHelpers) {
	return {
		restrict: 'E',
		scope: {},
		compile: function(tEl, tAttrs) {
			var highlight = angular.element('<g-tab-highlight></g-tab-highlight>');
			tEl.prepend(highlight);

			return function(scope, el, attrs, ctrl) {
				gHelpers.directiveApiLink(scope, el, attrs, ctrl);
			};
		},

		controller: function($scope, $element, $window) {
			$ctrl = this;
			var tabs = {};
			var highlight = $element.find('g-tab-highlight');
			var highlightStyle = $window.getComputedStyle(highlight[0]);
			var lastTab;
			var win = angular.element($window);

			$ctrl._register = register;
			$ctrl._setHighlight = setHighlight;
			$ctrl.activate = activate;

			constructor();

			function constructor() {
				win.on('resize', resizeHandler);

				$scope.$on('$destroy', function(){
					win.off('resize', resizeHandler);
				});
			}

			function resizeHandler() {
				if (lastTab) {
					setHighlight(lastTab);
				}
			}
			
			function activate(name) {
				for (var key in tabs) {
					if (key === name) {
						tabs[key].activate();
						$ctrl[key] = true;
					} else {
						tabs[key].deactivate();
						$ctrl[key] = false;
					}
				}
			}

			function register(name, ctrl) {
				tabs[name] = ctrl;
			}

			function setHighlight(currentTab) {
				lastTab = currentTab;

				var props = {
					visibility: 'visible'
				};

				if ($element.hasClass('g-tabs-vertical')) {
					props.height = currentTab[0].offsetHeight - parseInt(highlightStyle.marginTop) - parseInt(highlightStyle.marginBottom) + 'px';
					props.transform = props['-webkit-transform'] = props['-moz-transform'] = props['-ms-transform'] = 'translateY(' + currentTab[0].offsetTop + 'px)';
				} else {
					props.width = currentTab[0].offsetWidth - parseInt(highlightStyle.marginLeft) - parseInt(highlightStyle.marginRight) + 'px';
					props.transform = props['-webkit-transform'] = props['-moz-transform'] = props['-ms-transform'] = 'translateX(' + currentTab[0].offsetLeft + 'px)';
				}
			
				highlight.css(props);
			}
		}
	};
});