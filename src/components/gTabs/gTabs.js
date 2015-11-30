angular.module('G.tabs').directive('gTabs', function($window) {
	return {
		restrict: 'E',
		scope: {},
		link: function(scope, el, attrs) {
			el.addClass('g-tabs');
		
			var tabs;
			var observer;
			var highlight = angular.element('<g-tab-highlight class="g-tab-highlight"></g-tab-highlight>');
			var currentTab;
			el.append(highlight);
			
			var init = function() {
				getTabs()

				observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if (mutation.type === 'childList') {
							getTabs();
						}

						var target = angular.element(mutation.target);
				    	if (target.hasClass('g-tab active')) {
				    		makeActive(target);
				    	}
				  	});    
				});

				el.on('click', function(evt){
					var target = angular.element(evt.target);
					if (target.hasClass('g-tab')) {
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
				var props = {
					visibility: 'visible'
				};

				if (el.hasClass('g-tabs-vertical')) {
					props.height = currentTab[0].offsetHeight + 'px';
					props.top = currentTab[0].offsetTop + 'px';
				} else {
					props.width = currentTab[0].offsetWidth + 'px';
					props.left = currentTab[0].offsetLeft + 'px';
				}
				
				highlight.css(props);
			};

			var getTabs = function() {
				var children = el.children();
				tabs = [];

				for (var i = 0; i < children.length; i++) {
					var c = angular.element(children[i]);
					if (c.hasClass('g-tab') || c.nodeName === 'G-TAB') {
						if (c.hasClass('active')) {
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

				var siblings = [];
				for (var i = 0; i < tabs.length; i++) {
					if (tabs[i] != currentTab[0]) {
						siblings.push(tabs[i]);
					}
				}

				angular.element(siblings).removeClass('active');
				setHighlight();
				
				startObserving();
				
			};

			init();
		}
	}
});