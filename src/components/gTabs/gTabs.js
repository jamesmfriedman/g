angular.module('G.tabs').directive('gTabs', function($window, gHelpers, $timeout) {
	return {
		restrict: 'E',
		scope: {},
		compile: function(tEl, tAttrs) {

			return function(scope, el, attrs, ctrl) {
				gHelpers.directiveApiLink(scope, el, attrs, ctrl);
			
				var tabs;
				var observer;
				var highlight = angular.element('<g-tab-highlight></g-tab-highlight>');
				var currentTab;
				el.prepend(highlight);

				var highlightStyle = $window.getComputedStyle(highlight[0]);
				
				var init = function() {
					getTabs()

					observer = new MutationObserver(function(mutations) {
						mutations.forEach(function(mutation) {
							if (mutation.type === 'childList') {
								getTabs();
							}

							var target = angular.element(mutation.target);
					    	if (isTab(target) && target.hasClass('active')) {
					    		makeActive(target);
					    	}
					  	});    
					});

					el.on('click touchstart', function(evt){
						var target = angular.element(evt.target);
						if (isTab(target)) {
							makeActive(target);
						}
					});

					angular.element($window).on('resize', setHighlight);

					for (var i = 0; i < tabs.length; i++) {
						if (angular.element(tabs[i]).hasClass('active')) {
							currentTab = angular.element(tabs[i]);
							setHighlight();
							break;
						}
					}

					startObserving();
				};

				var startObserving = function() {
					observer.observe(el[0], { attributes: true, childList: true, characterData: true, subtree: true });
				};

				var stopObserving = function() {
					observer.disconnect();
				};

				var setHighlight = function() {
					if (!currentTab) return;

					var props = {
						visibility: 'visible'
					};

					if (el.hasClass('g-tabs-vertical')) {
						props.height = currentTab[0].offsetHeight - parseInt(highlightStyle.marginTop) - parseInt(highlightStyle.marginBottom) + 'px';
						props.transform = props['-webkit-transform'] = props['-moz-transform'] = props['-ms-transform'] = 'translateY(' + currentTab[0].offsetTop + 'px)';
					} else {
						props.width = currentTab[0].offsetWidth - parseInt(highlightStyle.marginLeft) - parseInt(highlightStyle.marginRight) + 'px';
						props.transform = props['-webkit-transform'] = props['-moz-transform'] = props['-ms-transform'] = 'translateX(' + currentTab[0].offsetLeft + 'px)';
					}
					
					highlight.css(props);
				};

				var isTab = function(node) {	
					return node.hasClass('g-tab') || node[0].nodeName === 'G-TAB';
				}

				var getTabs = function() {
					var children = el.children();
					tabs = [];

					for (var i = 0; i < children.length; i++) {
						var c = angular.element(children[i]);
						if (isTab(c)) {
							if (c.attr('as')) ctrl[c.attr('as')] = false;

							if (c.hasClass('active')) {
								if (c.attr('as')) ctrl[c.attr('as')] = true;
								currentTab = c;
								setHighlight();
							}
							tabs.push(c);
						}
					}

					tabs = angular.element(tabs);
				};

				var makeActive = function(tab) {
					stopObserving();
					currentTab = angular.element(tab);
					currentTab.addClass('active');
					if (currentTab.attr('as')) ctrl[currentTab.attr('as')] = true;

					for (var i = 0; i < tabs.length; i++) {
						if (tabs[i][0] !== currentTab[0]) {
							if (tabs[i].attr('as')) ctrl[tabs[i].attr('as')] = false;
							tabs[i].removeClass('active');
						}
					}

					setHighlight();
					startObserving();

					$timeout();
				};

				init();
			}
		},
		controller: function() {

		}
	}
});